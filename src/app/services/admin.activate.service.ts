import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot,RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from './authentication.service';
 
 
@Injectable()
export class AdminGuardService implements CanActivate {
 
    constructor(private router:Router, private authService: AuthenticationService ) {
    }
 
    canActivate(route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): boolean {
 
        //check some condition  
        if (this.authService.role != this.authService.ADMIN)  {
            console.log('You are not an admin');
            this.router.navigate(['/ingredients']);

            return false;
        } 
        return true;
    }
 
}