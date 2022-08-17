import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  public username: string = '';
  public password: string = '';
  public errorMessage: string = '';

  constructor(private authService: AuthenticationService, private router:Router) { }

  ngOnInit(): void {
  }
  
  
  onSubmit(form:NgForm){

    this.authService.authenticate(form.value.username, form.value.password)
      .subscribe(
        x => {
          this.errorMessage = '';
          console.log("dopo subscribe authenticate", x);
          this.router.navigateByUrl('/products');
        },
        error => {
          console.log('oops', error);
          this.errorMessage = error.error;
        }
      );

  }

}
