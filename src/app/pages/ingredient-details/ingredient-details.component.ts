import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Ingredient } from 'src/app/models/ingredient.model';
import { IngredientService } from 'src/app/services/ingredient.service';





@Component({
  selector: 'app-ingredient-details',
  templateUrl: './ingredient-details.component.html',
  styleUrls: ['./ingredient-details.component.scss']
})
export class IngredientDetailsComponent implements OnInit {

//metto il punto esclamativo percheè se non  lo metto mi da errore
  ingredient!:Ingredient;
  ingredientId!:number;
  new!:boolean;

  constructor(
    private ingredientsService:IngredientService,
    private router:Router,
    private route:ActivatedRoute) { }

  ngOnInit(): void {

    //PARTE DA RIGUARDARE 
    this.route.params.subscribe((params:Params)=>{
       //CREO L'OGGETTO
       this.ingredient=new Ingredient();
  
      if (params.id){
        // this.ingredient=
        this.ingredientsService.get(params.id).subscribe(ingredient => {
          this.ingredient= ingredient as Ingredient;
        });
        this.ingredientId=params.id;
        this.new=false;
      }

      else{
        this.new=true;
      }
    })

   }

  onSubmit(form:NgForm){
/*     //STAMPO A CONSOLE IL FORM 
    console.log(form) */;

    if(this.new){
      //allora dobbiamo salvare la nota
       //SALVO LA NOTA
      this.ingredientsService.add(form.value).subscribe(result => {
        this.router.navigateByUrl('/ingredients');
      });
    
    }else {
      this.ingredientsService.update(this.ingredientId,form.value).subscribe(result => {
        this.router.navigateByUrl('/ingredients');
      });
      // this.ingredientsService.update(this.ingredientId,form.value.nome, form.value.prezzo, form.value.immagine);
      
    }
    // this.router.navigateByUrl('/');


  }


  cancel(){

    this.router.navigateByUrl('/');

  }

}
