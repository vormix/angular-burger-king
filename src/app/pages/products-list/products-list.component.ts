import { Component, OnInit } from '@angular/core';

import{faSearch} from '@fortawesome/free-solid-svg-icons';
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

  
  constructor(private productsService:ProductService) {
    
  }



//fontawesome 
  faSearch=faSearch;
  ngOnInit(): void {
    // this.products=
    this.productsService.getAll().subscribe(data => {
      console.log(data);
      this.products = data as Product[];      
      this.allProducts = data as Product[];      
    });
  }

  deleteProduct(id:number){
    this.productsService.delete(id).subscribe(x => {
      alert('deleted');
    });

  }
  

  filtra(e: any) {
    console.log(e);
    let searchTerm: string = e.target.value;

    this.products = this.allProducts.filter(x => x.nome.includes(searchTerm) || x.prezzo.toString().includes(searchTerm));
  }
}
