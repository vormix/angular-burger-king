import { Component, OnInit } from '@angular/core';

import{faSearch} from '@fortawesome/free-solid-svg-icons';
import { Ingredient } from 'src/app/models/ingredient.model';
import { IngredientService } from 'src/app/services/ingredient.service';


@Component({
  selector: 'app-ingredients-list',
  templateUrl: './ingredients-list.component.html',
  styleUrls: ['./ingredients-list.component.scss']
})
export class IngredientsListComponent implements OnInit {
 
 
  ingredients:Ingredient[]= new Array<Ingredient>();

  
  constructor(private ingredientsService:IngredientService) {
    
  }



//fontawesome 
  faSearch=faSearch;
  ngOnInit(): void {
    // this.ingredients=
    this.ingredientsService.getAll().subscribe(data => {
      this.ingredients = data as Ingredient[];      
    });
  }

  deleteIngredient(id:number){
    this.ingredientsService.delete(id).subscribe(x => {
      alert('deleted');
    });

  }
  

}
