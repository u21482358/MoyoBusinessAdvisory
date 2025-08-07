import { SocialUser } from '@abacritt/angularx-social-login';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
public activeUserRole:any
  apiUrl:any = environment.apiUrl + 'User';
    constructor(private httpClient: HttpClient) { }
  
     httpOptions = {
      headers: new HttpHeaders({
       'Content-Type': 'application/json'
       })
        }

        
        Login(user: any) {
          console.log(this.apiUrl)
          let path = '/Login'
          alert(user.name)
          return this.httpClient.post(this.apiUrl + path, user, this.httpOptions)
        }

        createVendor(user: any) {
          let path = '/postVendor'
          alert(user.name)
          return this.httpClient.post(this.apiUrl + path, user, this.httpOptions)
        }

        createClient(user: any) {
          let path = '/postClient'
          alert(user.name)
          return this.httpClient.post(this.apiUrl + path, user, this.httpOptions)
        }

        createCapturer(user: any) { // the default user type as the manager will be created by default
          let path = '/postCapturer'
          alert(user.name)
          return this.httpClient.post(this.apiUrl + path, user, this.httpOptions)
        }

        SignInWithGoogle(user:SocialUser) {
          let path = '/OAuth'
          return this.httpClient.post(this.apiUrl + path,user, this.httpOptions)
            .pipe(
              catchError(this.handleError)
            )
        }

        GetVendorProducts(){
          let path = '/getVendorProducts'
          return this.httpClient.get(this.apiUrl + path, this.httpOptions)
            .pipe(
              catchError(this.handleError)
            )
        }

        private handleError(error: any) {
          if (error.error instanceof ErrorEvent) {
            console.error('An error occurred:', error.error.message);
          } else {
            console.error(
              `Backend returned code ${error.status}, ` +
              `body was: ${error.error}`);
          }
          return throwError('Something bad happened; please try again later.');
        }

        getVendors() {
          let path = '/getVendors'
          return this.httpClient.get<any[]>(this.apiUrl + path, this.httpOptions)
            .pipe(
              catchError(this.handleError)
            )
        }
  
}
