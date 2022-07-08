import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { User, User2 } from '../_models';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }   

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    headers = new HttpHeaders({
        'Content-type':'application/json',
        'accept':'text/plain',
        'Server':'Microsoft-IIS/10.0'})
    options ={headers: this.headers};


    async login(Username:string, Password:string): Promise<any> {
        console.log("2");
        let postData = {username: Username, password: Password};
        return await this.http
            .post<any>('http://vendingmachine-api.dotnet.speranzainc.net/api/auth/user-login', postData,this.options).toPromise().then(data => console.log(data))
            // .pipe(
            //  map((res) => {
            //     console.log("3");
            //  console.log("Res : ", res);
            //   return res;
        //      })
        //  );
      }
    // login(Username:string, Password:string): Observable<any> {
        
    //     console.log("2");
    //     let postData = {username: Username, password: Password};
    //     return this.http.post<User2>('http://vendingmachine-api.dotnet.speranzainc.net/api/auth/user-login', postData,this.options).toPromise().then(data => {
    //         return data;
    //     })
            // .pipe(map(user => {
                
            //     // localStorage.setItem('currentUser', JSON.stringify(user));
            //     // this.currentUserSubject.next(user);
            //     // return user;
            // }));
    // }

    logout() {
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
    register( user: User){
        return this.http.post('${environment.apiUrl}/users/register',user);
    }
}