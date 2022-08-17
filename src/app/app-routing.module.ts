import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainLayoutComponent } from './pages/main-layout/main-layout.component';
import { IngredientDetailsComponent } from './pages/ingredient-details/ingredient-details.component';
import { IngredientsListComponent } from './pages/ingredients-list/ingredients-list.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuardService } from './services/auth.activate.service';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { ProductsListComponent } from './pages/products-list/products-list.component';


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path:'products',
    component: MainLayoutComponent ,
    canActivate: [AuthGuardService],
    children:[
      {path:'',component:ProductsListComponent},
      {path:'new',component:ProductDetailsComponent},
      {path:':id',component:ProductDetailsComponent}
    ]
  },
  {
    path:'ingredients',
    component: MainLayoutComponent ,
    canActivate: [AuthGuardService],
    children:[
      {path:'',component:IngredientsListComponent},
      {path:'new',component:IngredientDetailsComponent},
      {path:':id',component:IngredientDetailsComponent}
    ]
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
