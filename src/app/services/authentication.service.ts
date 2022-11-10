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

  get userId(): string {
    return sessionStorage.getItem('userId') || '';
  }

  get token() {
    return sessionStorage.getItem('token');
  }

  authenticate(username: string, password: string) {

    console.log(username);
    console.log(password);

    //const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');

    return this.httpClient.post<any>(endPoint + 'api/Login', {username, password}, { headers, responseType: 'text' as 'json' }).pipe(
      map(
        response => {
          if (response != null) {
            response = JSON.parse(response);
            sessionStorage.setItem('token', response.token);
            sessionStorage.setItem('username', username);
            sessionStorage.setItem('userId', response.id.toString());
          }
          return response; 
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