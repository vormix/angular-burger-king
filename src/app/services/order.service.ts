
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http : HttpClient) { }
  
  getAll(){
    // return this.products;

    return this.http.get(environment.endPoint + 'api/orders/GetOrders');
    
  }


}
