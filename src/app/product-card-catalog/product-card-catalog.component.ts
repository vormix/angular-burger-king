import { Component, OnInit, Input, Output,EventEmitter} from '@angular/core';
import { Product } from '../models/product.model';


@Component({
  selector: 'app-product-card-catalog',
  templateUrl: './product-card-catalog.component.html',
  styleUrls: ['./product-card-catalog.component.scss']
})

export class ProductCardCatalogComponent implements OnInit {

 @Input('product') product: Product = new Product; 
 @Output('addToCart') addToCart:EventEmitter<Product>=new EventEmitter<Product>();
 @Input('isAdding') isAdding : boolean = false;

  constructor() { }

  ngOnInit(): void {}

  onClick(){
    this.addToCart.emit(this.product);
  }
}

