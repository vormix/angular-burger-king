import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthenticationService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    if (this.authService.username && this.authService.token) {
      req = req.clone({
        setHeaders: {
          Authorization: 'Bearer ' + this.authService.token
        }
      })
    }

    return next.handle(req);

  }
}
