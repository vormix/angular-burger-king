import { Component, OnInit, Input, Output,EventEmitter} from '@angular/core';
import { IngredientDto, ProductDto } from '../models/cart-product.model';
import { Ingredient } from '../models/ingredient.model';
import { ProductCartDetail } from '../models/product-cart-detail';
import { ProductIngredient } from '../models/product-ingredient.model';
import { Product } from '../models/product.model';
import { IngredientService } from '../services/ingredient.service';


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

 @Output('delete') deleteEvent:EventEmitter<ProductDto>=new EventEmitter<ProductDto>();

  constructor(private ingredientService: IngredientService) { }

  ngOnInit(): void {
  }

 

  removeIngredient(ingredient: IngredientDto) {
    console.log('TODO rimuovere ingrediente', ingredient);
    this.ingredientService.removeIngredientFromCart(this.product.productCartId, ingredient.id).subscribe((z: any) => {
      console.log(z);
    })
  }
  setQuantita(prodIng: IngredientDto){
    console.log('TODO cambiare quantita', prodIng);
    this.ingredientService.updateIngredientQuantityInCart(this.product.productCartId, prodIng.id, prodIng.quantity).subscribe((z: any) => {
      console.log(z);
    })
  }

  onXButtonClick(){
    console.log('onXButtonClick', this.product);
    this.deleteEvent.emit(this.product);
  }
}

