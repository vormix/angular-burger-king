import { Component, EventEmitter, OnInit, Output } from '@angular/core';
// import { faSearch } from '@fortawesome/free-solid-svg-icons';

import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {

  allProducts: Product[] = [];
  products:Product[]= new Array<Product>();
  addingProductId: number = 0;

  constructor(private productsService:ProductService) {
    
  }



//fontawesome 
  // faSearch=faSearch;
  ngOnInit(): void {
    // this.products=
    this.productsService.getAll().subscribe(data => {
      console.log(data);
      this.products = data as Product[];      
      this.allProducts = data as Product[];      
    });
  }

  // deleteProduct(id:number){
    

  //   this.productsService.delete(id).subscribe(deletedProduct => {
  //     if (deletedProduct.id) {
  //       this.deletingProductId = id;

  //       setTimeout(() => {
  //         let p: any = this.allProducts.find(x => x.id == deletedProduct.id);
  //         let index = this.allProducts.indexOf(p);
  //         this.allProducts.splice(index, 1);
  
  //         // p = this.products.find(x => x.id == deletedProduct.id);
  //         // index = this.products.indexOf(p);
  //         // this.products.splice(index, 1);

  //       }, 800);

  //     }
  //     // console.log(x);
  //     // alert('deleted');
  //   });

  // }
  

  filtra(e: any) {
    console.log(e);
    let searchTerm: string = e.target.value;

    this.products = this.allProducts.filter(x => x.nome.toLowerCase().includes(searchTerm.toLowerCase()) || x.prezzo.toString().includes(searchTerm.toLowerCase()));
  }

  OnAddToCart(product: Product) {
    console.log ('Aggiunto al carrello', product);
    this.productsService.addToCart(product.id).subscribe(result => {

      this.productsService.numCartProducts++;

      this.addingProductId = product.id;
      setTimeout(() => {
        this.addingProductId = 0;
      }, 800);

      console.log(result);
    });
  }

}
