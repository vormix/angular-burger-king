import { Component, OnInit } from '@angular/core';

// import{faSearch} from '@fortawesome/free-solid-svg-icons';
import { Ingredient } from 'src/app/models/ingredient.model';
import { IngredientService } from 'src/app/services/ingredient.service';


@Component({
  selector: 'app-ingredients-list',
  templateUrl: './ingredients-list.component.html',
  styleUrls: ['./ingredients-list.component.scss']
})
export class IngredientsListComponent implements OnInit {
 
  allIngredients: Ingredient[] = [];
  ingredients:Ingredient[]= new Array<Ingredient>();
  deletingIngredientId: number = 0;
  
  constructor(private ingredientsService:IngredientService) {
    
  }



//fontawesome 
  // faSearch=faSearch;
  ngOnInit(): void {
    // this.ingredients=
    this.ingredientsService.getAll().subscribe(data => {
      this.ingredients = data as Ingredient[];      
      this.allIngredients = data as Ingredient[];      
    });
  }

  deleteIngredient(id:number){
    this.ingredientsService.delete(id).subscribe(deletedIngredient => {
      if (deletedIngredient.id) {
        this.deletingIngredientId = id;

        setTimeout(() => {
          let p: any = this.allIngredients.find(x => x.id == deletedIngredient.id);
          let index = this.allIngredients.indexOf(p);
          this.allIngredients.splice(index, 1);
  
          // p = this.ingredients.find(x => x.id == deletedIngredient.id);
          // index = this.ingredients.indexOf(p);
          // this.ingredients.splice(index, 1);

        }, 800);

      }
    });

  }
  

  filtra(e: any) {
    console.log(e);
    let searchTerm: string = e.target.value;

    this.ingredients = this.allIngredients.filter(x => x.nome.toLowerCase().includes(searchTerm.toLowerCase()) || x.prezzo.toString().includes(searchTerm.toLowerCase()));
  }
}
