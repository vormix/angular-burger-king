import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IngredientDto } from 'src/app/models/cart-product.model';
import { Ingredient } from 'src/app/models/ingredient.model';
import { ProductIngredient } from 'src/app/models/product-ingredient.model';

@Component({
  selector: 'app-ingredients-table',
  templateUrl: './ingredients-table.component.html',
  styleUrls: ['./ingredients-table.component.scss']
})
export class IngredientsTableComponent implements OnInit {

  @Input('prodIngredients') prodIngredients: IngredientDto[] = [];  

  @Input('readOnly') readOnly: boolean = false; 
  @Input('showPriceToAdd') showPriceToAdd: boolean = false; 

  @Output('remove') remove: EventEmitter<IngredientDto> = new EventEmitter<IngredientDto>();
  @Output('change') change: EventEmitter<IngredientDto> = new EventEmitter<IngredientDto>();

  constructor() { }

  ngOnInit(): void {
  }

  setQuantita(prodIngredient: IngredientDto, value: string) {
    let prodIng = this.prodIngredients.find(x => x.id == prodIngredient.id);
    if (prodIng == null) return;
    prodIng.quantity = Number(value);

    this.change.emit(prodIng);
  }

  removeIngredient(i: IngredientDto) {
    // console.log(i);
    let prodIng = this.prodIngredients.find(pi => pi.id == i.id);
    if (prodIng == null) return;
    let index = this.prodIngredients.indexOf(prodIng);
    this.prodIngredients.splice(index, 1);

    this.remove.emit(i);
  }

}
