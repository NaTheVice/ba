import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

// this service cant use services with tags: provited in root
// services that used here has to register in app.module providers

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if(currentUser && (req.url === 'http://localhost:8070/userinfo')){
      console.log("interceptor used for userinfo...");
      let headers = req.headers
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${currentUser.token}`);
      const cloneReq = req.clone({ headers });
      return next.handle(cloneReq);
    }

    return next.handle(req);
  }
}