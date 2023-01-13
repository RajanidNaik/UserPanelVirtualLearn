import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let token = sessionStorage.getItem('token');
   
    // let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzljMzM5NDE3NTM4ZjAwYmIxNGZjNmMiLCJpYXQiOjE2NzI4MTI5MDAsImV4cCI6MTY3Mjg5OTMwMH0.DxXyvWWF31KDmrGQLeSY7hEGEH0q0t3Yty3IN8RphPI"
    
    request = request.clone({headers:request.headers.set('Authorization','Bearer ' + token)})
    return next.handle(request);
  }
}
