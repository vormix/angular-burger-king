import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Ingredient } from 'src/app/models/ingredient.model';
import { ProductIngredient } from 'src/app/models/product-ingredient.model';

@Component({
  selector: 'app-ingredients-table',
  templateUrl: './ingredients-table.component.html',
  styleUrls: ['./ingredients-table.component.scss']
})
export class IngredientsTableComponent implements OnInit {

  @Input('prodIngredients') prodIngredients: ProductIngredient[] = [];
  @Input('showRimovibile') showRimovibile: boolean = false; 
  @Input('showHeader') showHeader: boolean = false; 

  @Output('remove') remove: EventEmitter<Ingredient> = new EventEmitter<Ingredient>();

  constructor() { }

  ngOnInit(): void {
  }

  setQuantita(prodIngredient: ProductIngredient, value: string) {
    let prodIng = this.prodIngredients.find(x => x.idIngrediente == prodIngredient.idIngrediente);
    if (prodIng == null) return;
    prodIng.quantita = Number(value);
  }

  removeIngredient(i: Ingredient) {
    // console.log(i);
    let prodIng = this.prodIngredients.find(pi => pi.idIngrediente == i.id);
    if (prodIng == null) return;
    let index = this.prodIngredients.indexOf(prodIng);
    this.prodIngredients.splice(index, 1);

    this.remove.emit(i);
  }

}
