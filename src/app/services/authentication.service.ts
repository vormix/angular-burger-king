import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { endPoint } from '../common/globals';

export class User {
  constructor(
    public status: string,
  ) { }

}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private httpClient: HttpClient
  ) {
  }

  get username() {
    return sessionStorage.getItem('username');
  }

  get token() {
    return sessionStorage.getItem('token');
  }

  authenticate(username: string, password: string) {

    console.log(username);
    console.log(password);

    //const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');

    return this.httpClient.post<string>(endPoint + 'api/Login', {username, password}, { headers, responseType: 'text' as 'json' }).pipe(
      map(
        token => {
          if (token != null) {
            sessionStorage.setItem('token', token);
            sessionStorage.setItem('username', username);
          }
          return token;
        }
      )

    );
  }

  

  isUserLoggedIn() {
    let user = this.username;
    console.log(!(user === null))
    return !(user === null)
  }

  logOut() {
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('token');
  }
}