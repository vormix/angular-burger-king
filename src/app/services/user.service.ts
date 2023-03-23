//CREO QUESTO SERVIZIO PER GESTIRE I DATI SALVATI DAL FORM

import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserDto } from '../models/user.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  
  constructor(private http : HttpClient) { }
    
  GetUsers() : Observable<UserDto[]>{
    return this.http.get<UserDto[]>(environment.endPoint + 'api/user/GetUsers');    
  }

  GetUser(id: number): Observable<UserDto>{
    return this.http.get<UserDto>(environment.endPoint + 'api/user/GetUser?id=' + id);    
  }


}
