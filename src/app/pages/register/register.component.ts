import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserDto } from 'src/app/models/user.model';
import { AuthenticationService, User } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
 public username: string = '';
  public password: string = '';
  public email: string = '';
  public errorMessage: string = '';

  constructor(private userService: UserService, private router:Router) { }

  ngOnInit(): void {
  }
  
  
  onSubmit(form:NgForm){

    this.userService.RegisterUser(form.value)
      .subscribe(
        result => {
          this.errorMessage = '';
          console.log("dopo subscribe register", result);
          if (result === true) this.router.navigateByUrl('/login');
          else this.errorMessage = "Registrazione fallita: username in uso";
        },
        error => {
          console.log('oops', error);
          this.errorMessage = "Errore in fase di registrazione...";
        }
      );

  }
}
