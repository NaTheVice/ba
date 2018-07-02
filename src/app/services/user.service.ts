import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})


export class UserService {
  currentUser = new User;
  api = "";
  constructor(private http: HttpClient) {

    if (!environment.production) {
      this.api = "http://localhost:8070"
    }

    this.setCurrentUser();

  }



  public setCurrentUser() {
    console.log("setcurrentUser")
    /* 
      const httpOptions = {
        headers: new HttpHeaders({
          'authorization': `Bearer ${token}`,
          'cache-control': 'no-cache'
        }),
        body: ""
      };
    
      httpOptions.headers =
      httpOptions.headers.set('Authorization',  `Bearer ${token}`);
    
    
    
      console.log("options" + JSON.stringify(httpOptions.headers))
    */
    let user = JSON.parse(localStorage.getItem('currentUser'));
    if (user) {
      let token = user.token;

      this.http.get<User>(`${this.api}/userinfo`).subscribe((user) => {
        console.log("user: ", user)
        this.currentUser.id = user.id,
          this.currentUser.name = user.name,
          this.http.get<User>(`${this.api}/avatar?id=${user.id}`).subscribe((user) => {
            this.currentUser.avatar = user.avatar
            console.log("currentUser:", this.currentUser),
              error => console.log("error: ", error);
          });

        error => console.log("error: ", error);
      });
    }



    /* var data = "";
    
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    
    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        console.log(this.responseText);
      }
    });
    
    xhr.open("GET", "http://sandbox.ecocrowd.de/wp-json/wp/v2/users/me");
    xhr.setRequestHeader("authorization", "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9zYW5kYm94LmVjb2Nyb3dkLmRlIiwiaWF0IjoxNTI4MTg2MTU5LCJuYmYiOjE1MjgxODYxNTksImV4cCI6MTUyODc5MDk1OSwiZGF0YSI6eyJ1c2VyIjp7ImlkIjoiMTcifX19.OdR8OUfeB_DWus5rOuhPE7r1zQs-sRNNhMRIjfHll5g");
    xhr.send(data);
    } */

  }

  public getCurrentUser() {
    return this.currentUser;
  }
}