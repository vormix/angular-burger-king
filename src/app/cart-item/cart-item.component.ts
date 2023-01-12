import { Component, OnInit, Input, Output,EventEmitter} from '@angular/core';
import { CartDto, IngredientDto, ProductDto } from '../models/cart-product.model';
import { Ingredient } from '../models/ingredient.model';
import { ProductCartDetail } from '../models/product-cart-detail';
import { ProductIngredient } from '../models/product-ingredient.model';
import { Product } from '../models/product.model';
import { AuthenticationService } from '../services/authentication.service';
import { IngredientService } from '../services/ingredient.service';
import { ProductService } from '../services/product.service';


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

  constructor(private ingredientService: IngredientService, public productsService:ProductService, private authService: AuthenticationService) { }

  ngOnInit(): void {
  }

 

  removeIngredient(ingredient: IngredientDto) {
    console.log('TODO rimuovere ingrediente', ingredient);
    this.ingredientService.removeIngredientFromCart(this.product.productCartId, ingredient.id).subscribe((z: any) => {
      console.log(z);
        // ricarico totale carrello
        let userId = parseInt(this.authService?.userId || '0');
        if (userId == 0) return;
        this.productsService.getCart(userId).subscribe((data: CartDto) => {
          this.productsService.cartTotal = data.total;
        });
        // ricarico totale carrello
    })
  }
  setQuantita(prodIng: IngredientDto){
    console.log('TODO cambiare quantita', prodIng);
    prodIng.priceToPay = prodIng.quantity > prodIng.quantityBase ? (prodIng.quantity - prodIng.quantityBase) * prodIng.price : 0;
    this.ingredientService.updateIngredientQuantityInCart(this.product.productCartId, prodIng.id, prodIng.quantity).subscribe((z: any) => {
      console.log(z);


        // ricarico totale carrello
        let userId = parseInt(this.authService?.userId || '0');
        if (userId == 0) return;
        this.productsService.getCart(userId).subscribe((data: CartDto) => {
          this.productsService.cartTotal = data.total;
        });
        // ricarico totale carrello

    })
  }

  onXButtonClick(){
    console.log('onXButtonClick', this.product);
    this.deleteEvent.emit(this.product);
  }
}

