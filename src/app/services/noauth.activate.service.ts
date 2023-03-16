import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot,RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from './authentication.service';
 
 
@Injectable()
export class NoAuthGuardService implements CanActivate {
 
    constructor(private router:Router, private authService: AuthenticationService ) {
    }
 
    canActivate(route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): boolean {
 
        //check some condition  
        if (this.authService.isUserLoggedIn())  {
            console.log('You are already logged in');
            this.router.navigate(['/catalog']);
            //redirect to login/home page etc
            //return false to cancel the navigation
            // ciao
            return false;
        } 
        return true;
    }
 
}