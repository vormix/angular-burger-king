//CREO QUESTO SERVIZIO PER GESTIRE I DATI SALVATI DAL FORM

import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { endPoint } from '../common/globals';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

//creo l' array che contiene tutte le informazini dei form 
products :Product[]= new Array<Product>();
  
  constructor(private http : HttpClient) { }
  
getAll(){
  // return this.products;

  return this.http.get(endPoint + 'api/products');
  
}


  
  // creo dei metodi per manipolare i dati all'interno dell'array
get(id:number){
  // return this.products[id];
  return this.http.get(endPoint + 'api/products/'+id);
  
}



// getId(product:Product){
//   return this.products.indexOf(product);
// }


//metodo per aggiungere una nota all'arraye ritornare l'id della nota  dove l'id = index  
add(product: Product){
  
  // let headers = new HttpHeaders();
  // headers = headers.set('Content-Type', 'application/json'); // 'Access-Control-Allow-Origin':'*'

  return this.http.post(endPoint + 'api/products', product);
// let newLength =this.products.push(product);
// let index= newLength -1;
// return index;
  
}


update(id:number, product: Product){

  product.id = id;
  return this.http.put(endPoint + 'api/products/'+id, product);
  // let product = this.products[id];

 
}


delete(id:number){
  // this.products.splice(id,1);
  console.log('delete', id);
  return this.http.delete(endPoint + 'api/products/'+id);

}



}
