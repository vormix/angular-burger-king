import { Component, OnInit, Input, Output,EventEmitter} from '@angular/core';
import { IngredientDto, ProductDto } from '../models/cart-product.model';
import { Ingredient } from '../models/ingredient.model';
import { ProductCartDetail } from '../models/product-cart-detail';
import { ProductIngredient } from '../models/product-ingredient.model';
import { Product } from '../models/product.model';


@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})

export class CartItemComponent implements OnInit  {

//  @Input() nome!:string;
//  @Input()prezzo!:number;
//  @Input()immaginePrincipale!:string;

 @Input('isDeleting') isDeleting :boolean = false;
 @Input('ingredienti') ingredienti: IngredientDto[] = [];
 @Input('product') product!: ProductDto;

 @Output('delete') deleteEvent:EventEmitter<void>=new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

 

  removeIngredient(ingredient: IngredientDto) {
    console.log('TODO rimuovere ingrediente', ingredient);
  }
  setQuantita(prodIng: IngredientDto){
    console.log('TODO cambiare quantita', prodIng);
  }

  onXButtonClick(){
    this.deleteEvent.emit();
  }
}

