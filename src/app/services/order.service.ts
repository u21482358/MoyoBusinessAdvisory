import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
apiUrl = 'https://localhost:7267/api/Order';
  constructor(private httpClient: HttpClient) { }
  

   httpOptions = {
        headers: new HttpHeaders({
         'Content-Type': 'application/json'
         })
          }

  PlaceOrder(vendorProduct:any){
    let path = '/post'
    
    return this.httpClient.post(this.apiUrl + path, vendorProduct, this.httpOptions)
  }

  getOrders(){
    let path = '/get'
    return this.httpClient.get<any[]>(this.apiUrl + path, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

    private handleError(error: HttpErrorResponse) {
          if (error.error instanceof ErrorEvent) {
            console.error('An error occurred:', error.error.message);
          } else {
            console.error(
              `Backend returned code ${error.status}, ` +
              `body was: ${error.error}`);
          }
          return throwError('Something bad happened; please try again later.'); 
        }
}
