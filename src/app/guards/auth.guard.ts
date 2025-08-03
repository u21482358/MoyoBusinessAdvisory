import { Injectable } from '@angular/core';
import { CanActivate, CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { resolve } from 'path';
// https://agdev-tech.medium.com/angular-authentication-interceptors-and-guards-d234cfb12260
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService:AuthenticationService, private router: Router) {}
    async canActivate(): Promise<boolean> {
    // if (await this.authService.Authenticate()) {
    //   return true;
    // } else {
    //   this.router.navigate(['/login']);
    //   return false;
    // }
    //console.log("reach")
    var value:boolean = await this.authService.Authenticate()
    return new Promise((resolve, reject) => {
      console.log(value)
      if (!value) {
       this.router.navigate(['/login']);
      }
        resolve(value);
      
    
      });
    
    console.log("reach")
    //return new Promise(false)
  }
}
    
  
