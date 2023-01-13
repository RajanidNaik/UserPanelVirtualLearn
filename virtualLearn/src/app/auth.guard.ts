import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private service:AuthService, public router:Router){}
  canActivate(){
    if(this.service.isLoggedIn()){
      return true;
    }else{
      alert('You have not logged in')
      this.router.navigateByUrl('/');
      return false;
      
    }
  }
  
}
