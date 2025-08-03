import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../Models/Product';
import { catchError, Observable, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductserviceService {
apiUrl = 'https://localhost:7267/api/Product';
  constructor(private httpClient: HttpClient) { }

   httpOptions = {
    headers: new HttpHeaders({
     'Content-Type': 'application/json'
     })
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
      getProducts(): Observable<any[]> {
        let path = '/get'
        return this.httpClient.get<any[]>(this.apiUrl + path, this.httpOptions)
          .pipe(
            retry(2),
            catchError(this.handleError)
          )
        }

        createProduct(prod: Product){
          let path = '/post'
          alert(prod.price)
        return this.httpClient.post(this.apiUrl + path, prod, this.httpOptions)
      }

       updateProduct(data: any): Observable<Product> {
        let path = '/put'
         return this.httpClient
           .put<Product>(this.apiUrl + path, data, this.httpOptions)
           .pipe(
             retry(2),
             catchError(this.handleError)
           )
       }

       deleteProduct(id: string): Observable<any> {
        return this.httpClient.delete(`${this.apiUrl}/${id}` , this.httpOptions)
          .pipe(
            catchError(this.handleError)
          );
        }
}
