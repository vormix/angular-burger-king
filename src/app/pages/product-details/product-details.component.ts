import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Ingredient } from 'src/app/models/ingredient.model';
import { Product } from 'src/app/models/product.model';
import { IngredientService } from 'src/app/services/ingredient.service';
import { ProductService } from 'src/app/services/product.service';





@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

//metto il punto esclamativo percheè se non  lo metto mi da errore
  product!:Product;
  productId!:number;
  new!:boolean;

  ingredients!: Ingredient[];
  prodIngredients: Ingredient[] = [];

  constructor(
    private productsService:ProductService,
    private ingredientsService:IngredientService,
    private router:Router,
    private route:ActivatedRoute) { }

  ngOnInit(): void {

    //PARTE DA RIGUARDARE 
    this.route.params.subscribe((params:Params)=>{
       //CREO L'OGGETTO
       this.product=new Product();
  
      if (params.id){
        // this.product=
        this.productsService.get(params.id).subscribe(product => {
          this.product= product as Product;
        });
        this.productId=params.id;
        this.new=false;

        this.productsService.getIngredients(params.id).subscribe(ingredients => {
          this.prodIngredients= ingredients as Ingredient[];
        });
      }

      else{
        this.new=true;
      }

      this.ingredientsService.getAll().subscribe(ingredients => {
        this.ingredients= ingredients as Ingredient[];
        this.ingredients.sort((a, b) => a.nome.localeCompare(b.nome));
      });
    })

   }

  addIngredient() {
    let selectBox : any = document.getElementById('ingredients');
    let option = selectBox.options[selectBox.options.selectedIndex];
    let ingredientId = option.value;

    let ingredient: any = this.ingredients.find(x => x.id == ingredientId);
    if (!this.prodIngredients.includes(ingredient)) this.prodIngredients.push(ingredient);
  }

  removeIngredient(i: Ingredient) {
    let index = this.prodIngredients.indexOf(i);
    this.prodIngredients.splice(index, 1);
  }

  onSubmit(form:NgForm){
/*     //STAMPO A CONSOLE IL FORM 
    console.log(form) */;

    if(this.new){
      //allora dobbiamo salvare la nota
       //SALVO LA NOTA
      this.productsService.add(form.value).subscribe(result => {
        this.router.navigateByUrl('/products');
      });
    
    }else {
      this.productsService.update(this.productId,form.value).subscribe(result => {
        this.router.navigateByUrl('/products');
      });
      // this.ingredientsService.update(this.ingredientId,form.value.nome, form.value.prezzo, form.value.immagine);
      
    }
    // this.router.navigateByUrl('/');


  }


  cancel(){

    this.router.navigateByUrl('/');

  }

}
