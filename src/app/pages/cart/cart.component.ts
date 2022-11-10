import { Component, OnInit } from '@angular/core';

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
 
  allProducts: Product[] = [];
  cartProducts:any[]= new Array<any>();
  deletingProductId: number = 0;
  
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

    this.productsService.getCart(userId).subscribe((data: any) => {
      console.log(data); 
      this.cartProducts = data.prodottiCarrello; 
      // this.cartProducts = [];   
      // data.prodottiCarrello.forEach((pc: any) => this.cartProducts.push(pc.prodotto));
    });
  }

  deleteProduct(id:number){
    

    this.productsService.delete(id).subscribe(deletedProduct => {
      if (deletedProduct.id) {
        this.deletingProductId = id;

        setTimeout(() => {
          let p: any = this.allProducts.find(x => x.id == deletedProduct.id);
          let index = this.allProducts.indexOf(p);
          this.allProducts.splice(index, 1);
  
          // p = this.products.find(x => x.id == deletedProduct.id);
          // index = this.products.indexOf(p);
          // this.products.splice(index, 1);

        }, 800);

      }
      // console.log(x);
      // alert('deleted');
    });

  }
  

  filtra(e: any) {
    console.log(e);
    let searchTerm: string = e.target.value;

    this.cartProducts = this.allProducts.filter(x => x.nome.toLowerCase().includes(searchTerm.toLowerCase()) || x.prezzo.toString().includes(searchTerm.toLowerCase()));
  }
}
