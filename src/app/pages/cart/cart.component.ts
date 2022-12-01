import { Component, OnInit } from '@angular/core';
import { CartDto, CartProduct } from 'src/app/models/cart-product.model';

// import{faSearch} from '@fortawesome/free-solid-svg-icons';
import { Product } from 'src/app/models/product.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ProductService } from 'src/app/services/product.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
 
  cartDto: CartDto | undefined;

  // cartProducts:CartProduct[]= new Array<CartProduct>();
  deletingProductCartId: number = 0;
  
  constructor(private productsService:ProductService, private authService: AuthenticationService) {
    
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
      // this.cartProducts = data.prodottiCarrello; 

      // this.cartProducts = [];   
      // data.prodottiCarrello.forEach((pc: any) => this.cartProducts.push(pc.prodotto));
    });
  }

  deleteProduct(productCartId:number){
    console.log('deleteProduct', productCartId);
    this.productsService.removeFromCart(productCartId).subscribe((result: boolean) => {
      if (result) {
        this.deletingProductCartId = productCartId;
        console.log('deleteProduct result', result);

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
