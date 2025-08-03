import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
public activeUserRole:any
  apiUrl = 'https://localhost:7267/api/User';
    constructor(private httpClient: HttpClient) { }
  
     httpOptions = {
      headers: new HttpHeaders({
       'Content-Type': 'application/json'
       })
        }

        
        Login(user: any) {
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
