import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import {FormsModule} from '@angular/forms';     //LO IMPORTO MANUALMENTE PER I FORM CHE TROVO SU NOTE-DETAILS



import { IngredientsListComponent } from './pages/ingredients-list/ingredients-list.component';
import { MainLayoutComponent } from './pages/main-layout/main-layout.component';
//import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IngredientCardComponent } from './ingredient-card/ingredient-card.component';
import { IngredientDetailsComponent } from './pages/ingredient-details/ingredient-details.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from './services/httpinterceptor.service';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuardService } from './services/auth.activate.service';
import { ProductsListComponent } from './pages/products-list/products-list.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { ProductCardCatalogComponent } from './product-card-catalog/product-card-catalog.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { CatalogComponent } from './pages/catalog/catalog.component';
import { CartComponent } from './pages/cart/cart.component';
import { CartItemComponent } from './cart-item/cart-item.component';
import { IngredientsTableComponent } from './shared/ingredients-table/ingredients-table.component';

@NgModule({
  declarations: [
    AppComponent,
    
    MainLayoutComponent,
    IngredientsListComponent,
    IngredientCardComponent,
    IngredientDetailsComponent,
    ProductsListComponent,
    ProductCardComponent,
    ProductCardCatalogComponent,
    ProductDetailsComponent,
    LoginComponent,
    CatalogComponent,
    CartComponent,
    CartItemComponent,
    IngredientsTableComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // FontAwesomeModule,
    FormsModule, 
    HttpClientModule 
  ],
  providers: [
    AuthGuardService,
    {  
      provide:HTTP_INTERCEPTORS, useClass:AuthInterceptorService, multi:true 
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
