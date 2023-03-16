
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { OrderDto } from '../models/cart-product.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  
  constructor(private http : HttpClient) { }
  
  getAll(){   
    return this.http.get(environment.endPoint + 'api/orders/GetOrders');    
  }

  getMyOrders(): Observable<OrderDto[]>{  
    return this.http.get<OrderDto[]>(environment.endPoint + 'api/orders/GetMyOrders');    
  }

  getMyOrder(id: number): Observable<OrderDto>{  
    return this.http.get<OrderDto>(environment.endPoint + 'api/orders/GetMyOrder?orderId='+id);    
  }

  getOrderOnce(payToken: string) {
    return this.http.get<any>(environment.endPoint + 'api/orders/GetOrderOnce?payToken='+payToken);    
  }


}
