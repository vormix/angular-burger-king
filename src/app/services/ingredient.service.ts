//CREO QUESTO SERVIZIO PER GESTIRE I DATI SALVATI DAL FORM

import { Injectable } from '@angular/core';
import { Ingredient } from '../models/ingredient.model';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { endPoint } from '../common/globals';


@Injectable({
  providedIn: 'root'
})
export class IngredientService {

//creo l' array che contiene tutte le informazini dei form 
ingredients :Ingredient[]= new Array<Ingredient>();
  
  constructor(private http : HttpClient) { }
  
getAll(){
  // return this.ingredients;

  return this.http.get(endPoint + 'api/ingredients');
  
}


  
  // creo dei metodi per manipolare i dati all'interno dell'array
get(id:number){
  // return this.ingredients[id];
  return this.http.get(endPoint + 'api/ingredients/'+id);
  
}



// getId(ingredient:Ingredient){
//   return this.ingredients.indexOf(ingredient);
// }


//metodo per aggiungere una nota all'arraye ritornare l'id della nota  dove l'id = index  
add(ingredient: Ingredient){
  
  // let headers = new HttpHeaders();
  // headers = headers.set('Content-Type', 'application/json'); // 'Access-Control-Allow-Origin':'*'

  return this.http.post(endPoint + 'api/ingredients', ingredient);
// let newLength =this.ingredients.push(ingredient);
// let index= newLength -1;
// return index;
  
}


update(id:number, ingredient: Ingredient){

  ingredient.id = id;
  return this.http.put(endPoint + 'api/ingredients/'+id, ingredient);
  // let ingredient = this.ingredients[id];

 
}


delete(id:number){
  // this.ingredients.splice(id,1);
  console.log('delete', id);
  return this.http.delete(endPoint + 'api/ingredients/'+id);

}



}
