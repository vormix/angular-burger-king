import { Component, OnInit, Input, Output,EventEmitter, OnChanges, SimpleChanges} from '@angular/core';
import { Ingredient } from '../models/ingredient.model';
import { ProductCartDetail } from '../models/product-cart-detail';
import { ProductIngredient } from '../models/product-ingredient.model';
import { Product } from '../models/product.model';


@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})

export class CartItemComponent implements OnInit , OnChanges {

//  @Input() nome!:string;
//  @Input()prezzo!:number;
//  @Input()immaginePrincipale!:string;

 prodIngredients: ProductIngredient[] = [];

 @Input('isDeleting') isDeleting :boolean = false;
 @Input('ingredienti') ingredienti: ProductCartDetail[] = [];
 @Input('product') product!: Product;

 @Output('delete') deleteEvent:EventEmitter<void>=new EventEmitter<void>();

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    let ingredienti = changes.ingredienti.currentValue  as ProductCartDetail[];
    this.prodIngredients.splice(0, this.prodIngredients.length);
    ingredienti.forEach(i => {
      let pi = new ProductIngredient;
      pi.idIngrediente = i.idIngrediente;
      pi.idProdotto = this.product.id;
      pi.ingrediente = i.ingrediente;
      pi.quantita = i.quantita;
      this.prodIngredients.push(pi);
    })
  }

  ngOnInit(): void {
  }

 

  removeIngredient(ingredient: Ingredient) {
    console.log('TODO rimuovere ingrediente', ingredient);
  }
  setQuantita(prodIng: ProductIngredient){
    console.log('TODO cambiare quantita', prodIng);
  }

  onXButtonClick(){
    this.deleteEvent.emit();
  }
}

