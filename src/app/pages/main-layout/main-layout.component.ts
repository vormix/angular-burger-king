import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartDto } from 'src/app/models/cart-product.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {

  isBurgerOpen: boolean = false;
  public username: string | null = '';
  //public numProducts: number = 0;

  constructor(private authService: AuthenticationService, public productsService:ProductService, private router:Router) { 
  }

  ngOnInit(): void {
    this.username = this.authService.username;

    let userId = parseInt(this.authService?.userId || '0');
    if (userId > 0) {
      this.productsService.getCart(userId).subscribe((data: CartDto) => {
        this.productsService.numCartProducts = data.products.length;
      });
    }
  }

  logout() {
    this.authService.logOut();
    this.router.navigateByUrl('/login');
  }

  toggleOpen() {
    console.log('toggle isBurgerOpen'); 
    this.isBurgerOpen = !this.isBurgerOpen;
  }

}
