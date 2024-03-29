import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartDto, CartProduct } from 'src/app/models/cart-product.model';

import { Product } from 'src/app/models/product.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ProductService } from 'src/app/services/product.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
 
  cartDto: CartDto | undefined;
  isOrderSubmitted: boolean = false;

  url: string;

  // cartProducts:CartProduct[]= new Array<CartProduct>();
  deletingProductCartId: number = 0;
  
  constructor(public productsService:ProductService, private authService: AuthenticationService, private router:Router) {
    
  }


  transformOrder() {
    let userId = parseInt(this.authService?.userId || '0');
    this.productsService.transformCartToOrder(userId).subscribe(resp => {

      if (resp.idOrdine > 0 && resp.payToken != "") {
        this.url = environment.endPointBanca + "?payToken=" + resp.payToken;
        
        this.productsService.numCartProducts = 0;
        this.cartDto.products = [];
        this.isOrderSubmitted = true;
      }

      // if (idOrder > 0) {
      //   this.productsService.numCartProducts = 0;
      //   this.cartDto.products = [];
      //   this.isOrderSubmitted = true;
      // }

    })
  }

//fontawesome 
  // faSearch=faSearch;
  ngOnInit(): void {
    
    // this.productsService.getAll().subscribe(data => {
    //   console.log(data);
    //   this.cartProducts = data as Product[];      
    //   this.allProducts = data as Product[];      
    // });
    let userId = parseInt(this.authService?.userId || '0');
    if (userId == 0) return;

    this.productsService.getCart(userId).subscribe((data: CartDto) => {
      console.log(data); 
      this.cartDto = data;
      this.productsService.cartTotal = data.total;
      // this.cartProducts = data.prodottiCarrello; 

      // this.cartProducts = [];   
      // data.prodottiCarrello.forEach((pc: any) => this.cartProducts.push(pc.prodotto));
    });
  }

  deleteProduct(productCartId:number){
    console.log('deleteProduct', productCartId);
    this.productsService.removeFromCart(productCartId).subscribe((result: boolean) => {
      if (result) {
        this.productsService.numCartProducts--;

        // ricarico totale carrello
        let userId = parseInt(this.authService?.userId || '0');
        if (userId == 0) return;
        this.deletingProductCartId = productCartId;
        console.log('deleteProduct result', result);
        this.productsService.getCart(userId).subscribe((data: CartDto) => {
          this.productsService.cartTotal = data.total;
        });
        // ricarico totale carrello

        setTimeout(() => {
          let p : any = this.cartDto?.products.find(x => x.productCartId == productCartId);
          let index: number = this.cartDto?.products.indexOf(p) || 0;
          this.cartDto?.products.splice(index, 1);
          this.deletingProductCartId = 0;
          console.log('deleteProduct after setTimeout');
        }, 800);
      }
    });
  }
  
}
