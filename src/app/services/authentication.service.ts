import { HttpClient, HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Route } from '@angular/router';
import { Router } from '@angular/router';
import { catchError, map, Observable, throwError } from 'rxjs';
import { UserService } from './user.service';
import { DOCUMENT } from '@angular/common';
import { environment } from '../../environments/environment';
//import { BROWSER_STORAGE } from './browserservice.service';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService implements HttpInterceptor {
  
 // https://stackoverflow.com/questions/77534244/local-storage-is-not-defined-in-angular-17
  constructor(private httpClient:HttpClient,private router:Router,private userService:UserService) {
   }
apiUrl = environment.apiUrl + 'User';


intercept(req: HttpRequest<any>,
    next: HttpHandler): Observable<HttpEvent<any>> {
      
      let h1 = ""
      let h12 = "a"

  
  var cloned = req.clone()
  if(typeof localStorage !== 'undefined'){

    

    var jwt2 = localStorage.getItem('token')
    console.log(jwt2)
  const jwt = JSON.parse(JSON.stringify(localStorage.getItem('token')!)) // wasnt valid Json so just stringified
cloned = req.clone({
       headers:  req.headers.set("Authorization","Bearer " + jwt)
       .set('Cache-Control', 'no-cache').set('responseType', 'blob')
   
  });
  }
   
 
// https://v17.angular.io/guide/http-interceptor-use-cases
   return next.handle(cloned).pipe(
                 catchError((error: HttpErrorResponse) => {
                  console.log(error)
                    if (error.status==401) {
                      console.log("401 error")
                      this.router.navigate([''])
                    }
                    return throwError(error);
                  } // else navigate to dashboard or whatever then you need to clear local storage before the test
                 
                 )
                //
                 )
           
    }
   async Authenticate():Promise<any>{
      let bool = false
      console.log("auth")
      let val = new Promise((resolve,reject) =>{
     let req =  this.httpClient.get(`${this.apiUrl}/CheckAuthentication`,{observe: 'response'}).pipe(
        map((res:any) =>{
          console.log(res)
         this.userService.activeUserRole = res.body.role
         this.userService.showNavigation.next(true)
          resolve(true)
          bool=true
        }),
        catchError((err) =>{
          { // just check numbers of errors for client side and server side...
             this.userService.showNavigation.next(false)
             this.router.navigate(['']);
            reject(false) // check actual codes and maybe do this differently
            bool=false
         
            
           }
            
            return throwError(err)
        }) // retry is working...
      ).subscribe((res:any) => {
        console.log(res)
        this.userService.activeUserRole = res.body.role
      })
      })
await val;

return val;
}
}
