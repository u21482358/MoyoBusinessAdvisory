import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

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
}
