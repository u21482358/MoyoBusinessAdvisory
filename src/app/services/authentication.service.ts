import { HttpClient, HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Route } from '@angular/router';
import { Router } from '@angular/router';
import { catchError, map, Observable, throwError } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService implements HttpInterceptor {

  constructor(private httpClient:HttpClient,private router:Router,private userService:UserService) { }
apiUrl = 'https://localhost:7267/api/User/';


intercept(req: HttpRequest<any>,
    next: HttpHandler): Observable<HttpEvent<any>> {
      //localStorage.getItem('Token') && localStorage.getItem('Token') != null
      let h1 = ""
      let h12 = "a"
      //console.log("hi")
      //console.log(localStorage.getItem('Token'))
      //console.log(localStorage.getItem('Token'))
      //let var = localStorage.getItem('Token')
//console.log("reach")
  //console.log(localStorage.getItem('Token'))
  var jwt2 = localStorage.getItem('token')
  //console.log(jwt2)
  const jwt = JSON.parse(JSON.stringify(localStorage.getItem('token')!)) // wasnt valid Json so just stringified
  //console.log(jwt)
 //const token = jwt.token
//console.log(token)
  var cloned = req.clone({
       headers:  req.headers.set("Authorization","Bearer " + jwt)
       .set('Cache-Control', 'no-cache').set('responseType', 'blob')
   
  });
// https://v17.angular.io/guide/http-interceptor-use-cases
   return next.handle(cloned).pipe(
                 catchError((error: HttpErrorResponse) => {
                  console.log(error)
                    if (error.status==401) {
                      console.log("401 error")
                      this.router.navigate(['/Login'])
                    }
                    return throwError(error);
                  } // else navigate to dashboard or whatever then you need to clear local storage before the test
                 
                 )
                
                 )
           
    }
   async Authenticate():Promise<any>{
      let bool = false
      console.log("auth")
      let val = new Promise((resolve,reject) =>{
     let req =  this.httpClient.get(`${this.apiUrl}CheckAuthentication`,{observe: 'response'}).pipe(
        map((res:any) =>{
          console.log(res)
         this.userService.activeUserRole = res.body.role
          resolve(true)
          bool=true
        }),
        catchError((err) =>{
          { // just check numbers of errors for client side and server side...
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
