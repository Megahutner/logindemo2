import { Injectable } from "@angular/core";
import { HttpRequest, HttpResponse,HttpHandler,HttpEvent,HttpInterceptor,HTTP_INTERCEPTORS } from "@angular/common/http";
import { Observable, of, throwError } from "rxjs";
import {delay, mergeMap,materialize, dematerialize} from 'rxjs/operators'
import { users } from "../_models";//
//import { registerLocaleData } from "@angular/common";
const usersKey ='aaa';
//let users = JSON.parse(localStorage.getItem('users')) || [];
@Injectable()
export class FakeBackEndInterceptor implements HttpInterceptor{
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const {url,method,headers,body} = req;

        return of(null)
        .pipe (mergeMap(handleRoute))
        .pipe(materialize())
        .pipe(delay(500))
        .pipe(dematerialize());

        function handleRoute(){
            switch (true){
                case url.endsWith('/user-login') && method === 'POST':
                    return authenticate();
                case url.endsWith('/user/register') && method === 'POST':
                      return register();
                default:
                    return next.handle(req);        
            }
        }
        function authenticate(){
            const {username, password}= body;
            const user = users.find(
                x => x.username === username && x.password === password);
                if (!user) return error("Username or password is incorrect");
                return ok({
                    username: user.username,
                    password: user.password,
                    token: 'fake-jwt-token',
                });
            
        }
        function register(){
          const {username, password}= body;
          const user = body;
          if (users.find(
            x => x.username === username )){
              return error ('Username "'+ user.username+'" is already taken')
            }
          user.id = users.length ? Math.max(...users.map(x=> x.id))+1:1;
          users.push(user);
          localStorage.setItem(usersKey,JSON.stringify(users));
          return ok();  
          

        }
        function getUsers() {
            if (!isLoggedIn()) return unauthorized();
            return ok(users);
          }
      
       
      
          function ok(body?) {
            return of(new HttpResponse({ status: 200, body }));
          }
      
          function error(message: string) {
            return throwError({ error: { message } });
          }
      
          function unauthorized() {
            return throwError({ status: 401, error: { message: 'Unauthorised' } });
          }
      
          function isLoggedIn() {
            return headers.get('Authorization') === 'Bearer fake-jwt-token';
          }


    }
}
export let fakeBackEndProvider ={
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackEndInterceptor,
    multi: true,
};