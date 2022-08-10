import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {

  public username: string | null = '';

  constructor(private authService: AuthenticationService, private router:Router) { 
  }

  ngOnInit(): void {
    this.username = this.authService.username;
  }

  logout() {
    this.authService.logOut();
    this.router.navigateByUrl('/login');
  }

}
