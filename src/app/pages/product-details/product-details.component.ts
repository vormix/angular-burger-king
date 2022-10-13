import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Ingredient } from 'src/app/models/ingredient.model';
import { ProductIngredient } from 'src/app/models/product-ingredient.model';
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
  prodIngredients: ProductIngredient[] = [];
  ingredientsOfProduct: Ingredient[] = [];

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

        this.productsService.getIngredients(params.id).subscribe((ingredients: any) => {
          // this.prodIngredients= ingredients.map((i:any) => i.ingrediente) as Ingredient[];
          this.prodIngredients = ingredients as ProductIngredient[];
          this.ingredientsOfProduct= ingredients.map((i:any) => i.ingrediente) as Ingredient[];

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
    let oldIngredient: any = this.ingredientsOfProduct.find(x => x.id == ingredientId);
    if (oldIngredient == null) {
      this.ingredientsOfProduct.push(ingredient);

      let prodIng = new ProductIngredient();
      prodIng.idIngrediente = ingredientId;
      prodIng.idProdotto = this.product.id;
      prodIng.ingrediente = ingredient;
      this.prodIngredients.push(prodIng);
    }
  }

  removeIngredient(i: Ingredient) {
    let index = this.ingredientsOfProduct.indexOf(i);
    this.ingredientsOfProduct.splice(index, 1);

    let prodIng = this.prodIngredients.find(pi => pi.idIngrediente == i.id);
    if (prodIng == null) return;
    index = this.prodIngredients.indexOf(prodIng);
    this.prodIngredients.splice(index, 1);
  }

  onSubmit(form:NgForm){
/*     //STAMPO A CONSOLE IL FORM 
    console.log(form) */;
    //  debugger;
    // return;
    //console.log(form.value); return;
    if(this.new){
      //allora dobbiamo salvare la nota
       //SALVO LA NOTA
      this.productsService.add(form.value).subscribe((newProduct: Product) => {
        
          this.productsService.addIngredientsOfProduct(newProduct, this.prodIngredients).subscribe(x => {
            this.router.navigateByUrl('/products');
          });        
          
      });
    
    }else {
      this.productsService.update(this.productId,form.value).subscribe((newProduct: Product) => {
        this.productsService.addIngredientsOfProduct(newProduct, this.prodIngredients).subscribe(x => {
            this.router.navigateByUrl('/products');
          });
      });
      // this.ingredientsService.update(this.ingredientId,form.value.nome, form.value.prezzo, form.value.immagine);
      
    }
    // this.router.navigateByUrl('/');


  }


  cancel(){

    this.router.navigateByUrl('/');

  }

  setQuantita(prodIngredient: ProductIngredient, value: string) {
    let prodIng = this.prodIngredients.find(x => x.idIngrediente == prodIngredient.idIngrediente);
    if (prodIng == null) return;
    prodIng.quantita = Number(value);
  }

}
