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
    return localStorage.getItem('username');
  }

  get userId(): string {
    return localStorage.getItem('userId') || '';
  }

  get role(): string {
    return localStorage.getItem('role') || '';
  }

  get token() {
    return localStorage.getItem('token');
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
            localStorage.setItem('token', response.token);
            localStorage.setItem('username', username);
            localStorage.setItem('userId', response.id.toString());
            localStorage.setItem('role', response.role.toString());
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
    localStorage.removeItem('username');
    localStorage.removeItem('token');
  }
}