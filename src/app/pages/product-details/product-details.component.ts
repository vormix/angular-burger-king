import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';
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

  constructor(
    private productsService:ProductService,
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
      this.productsService.add(form.value).subscribe(result => {
        this.router.navigateByUrl('/');
      });
    
    }else {
      this.productsService.update(this.productId,form.value).subscribe(result => {
        this.router.navigateByUrl('/');
      });
      // this.ingredientsService.update(this.ingredientId,form.value.nome, form.value.prezzo, form.value.immagine);
      
    }
    // this.router.navigateByUrl('/');


  }


  cancel(){

    this.router.navigateByUrl('/');

  }

}
