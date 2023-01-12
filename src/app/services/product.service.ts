//CREO QUESTO SERVIZIO PER GESTIRE I DATI SALVATI DAL FORM

import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { endPoint } from '../common/globals';
import { Ingredient } from '../models/ingredient.model';
import { ProductIngredient } from '../models/product-ingredient.model';
import { CartDto } from '../models/cart-product.model';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

//creo l' array che contiene tutte le informazini dei form 
products :Product[] = new Array<Product>();

private static _cartTotal: number = 0;
get cartTotal() {
  return ProductService._cartTotal;
}
set cartTotal(value) {
  ProductService._cartTotal = value;
}

private static _numProducts: number = 0;
get numCartProducts() {
  return ProductService._numProducts;
}
set numCartProducts(value) {
  ProductService._numProducts = value;
}
  
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

  return this.http.post<Product>(endPoint + 'api/products', product);
// let newLength =this.products.push(product);
// let index= newLength -1;
// return index;
  
}


update(id:number, product: Product){

  product.id = id;
  return this.http.put<Product>(endPoint + 'api/products/'+id, product);
  // let product = this.products[id];

 
}


delete(id:number): Observable<Product>{
  // this.products.splice(id,1);
  console.log('delete', id);
  return this.http.delete<Product>(endPoint + 'api/products/'+id);

}

getIngredients(productId:number){
  // this.products.splice(id,1);
  console.log('getIngredients', productId);
  return this.http.get(endPoint + 'api/products/'+productId + '/ingredients');

}

addIngredientsOfProduct(product: Product, ingredients: ProductIngredient[]) {
  return this.http.post(endPoint + `api/products/${product.id}/ingredients`, { ingredients: ingredients } );
}

getCart(cartId:number): Observable<CartDto>{
  // this.products.splice(id,1);
  console.log('getCart', cartId);
  return this.http.get<CartDto>(endPoint + 'api/cart/GetCartDto/'+cartId );

}

addToCart(productId: number) {
  return this.http.post<number>(endPoint + `api/cart/AddToCart`, productId );

}

removeFromCart(productCartId: number) {
  return this.http.post<boolean>(endPoint + `api/cart/RemoveFromCart`, productCartId );

}

}
