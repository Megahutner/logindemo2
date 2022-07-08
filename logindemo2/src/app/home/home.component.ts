import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs';
import { User } from '../_models';
import { PostService } from '../_services';
import { HttpHeaders, HttpResponse,HttpClient } from '@angular/common/http';
import {  User2 } from '../_models';
@Component({ templateUrl: 'home.component.html'
})
export class HomeComponent implements OnInit {
  url = 'http://vendingmachine-api.dotnet.speranzainc.net/api/auth/user-login';
  posts: any={};
  datas: any={};
  username;
  password;
  postId;

  
  loading = false;
  users: User[] ;
  
  
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ${auth_token}'
  })
  request = {headers:this.headers};

  constructor(private http: HttpClient,private postService:PostService) { }

  ngOnInit() {  
    
    this.loading = true;
   
    this.postService.getPosts().subscribe(response =>{
      this.posts = response;
    })

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ${eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjlmNDEwMjIxLTA1ODUtNDgxZC05NmNhLTBmN2FjNDQyZTI3NyIsIm5iZiI6MTY1NzE2MDEwOSwiZXhwIjoxNjU3MTc4MTA5LCJpYXQiOjE2NTcxNjAxMDl9.4EYLU-6NMj3VKRxTvlpMJfGQkE3mSeRM6IoLmXy-7kM.9f410221-0585-481d-96ca-0f7ac442e277}'
    })
    this.postService.getDatas().subscribe(response1 =>{
      this.datas = response1;
    })
    this.http.post<Data>('https://reqres.in/api/posts',{}).subscribe(data1 =>{
      this.postId = data1.id;
    })
    const body=JSON.stringify(User2);
   
    this.http.post('http://vendingmachine-api.dotnet.speranzainc.net/api/auth/user-login',body,{})

    }

  }


interface Data{
  id: number;
  username: string;
  password: string;
}