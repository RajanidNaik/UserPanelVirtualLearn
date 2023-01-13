import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  isLoggedIn(){
    if(sessionStorage.getItem('token')){
      return true;
    }else{
      return false;
    }

  }
}
