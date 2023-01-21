import { Component, OnInit } from '@angular/core';

import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';


@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {
 
  allProducts: Product[] = [];
  products:Product[]= new Array<Product>();
  deletingProductId: number = 0;
  
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

    this.products = this.allProducts.filter(x => x.nome.toLowerCase().includes(searchTerm.toLowerCase()) || x.prezzo.toString().includes(searchTerm.toLowerCase()));
  }
}
