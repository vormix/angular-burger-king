import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


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

  get ADMIN() {
    return "Admin";
  }

  get username() {
    return sessionStorage.getItem('username');
  }

  get userId(): string {
    return sessionStorage.getItem('userId') || '';
  }

  get role(): string {
    return sessionStorage.getItem('role') || '';
  }

  get token() {
    return sessionStorage.getItem('token');
  }

  authenticate(username: string, password: string) {

    console.log(username);
    console.log(password);

    //const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');

    return this.httpClient.post<any>(environment.endPoint + 'api/Login', {username, password}, { headers, responseType: 'text' as 'json' }).pipe(
      map(
        response => {
          if (response != null) {
            response = JSON.parse(response);
            sessionStorage.setItem('token', response.token);
            sessionStorage.setItem('username', username);
            sessionStorage.setItem('userId', response.id.toString());
            sessionStorage.setItem('role', response.role.toString());
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