import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainLayoutComponent } from './pages/main-layout/main-layout.component';
import { IngredientDetailsComponent } from './pages/ingredient-details/ingredient-details.component';
import { IngredientsListComponent } from './pages/ingredients-list/ingredients-list.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuardService } from './services/auth.activate.service';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { ProductsListComponent } from './pages/products-list/products-list.component';
import { CatalogComponent } from './pages/catalog/catalog.component';
import { CartComponent } from './pages/cart/cart.component';
import { OrdersListComponent } from './pages/orders-list/orders-list.component';
import { OrderDetailsComponent } from './pages/order-details/order-details.component';
import { AdminGuardService } from './services/admin.activate.service';
import { CallbackComponent } from './pages/callback/callback.component';
import { NoAuthGuardService } from './services/noauth.activate.service';
import { MyOrdersComponent } from './pages/my-orders/my-orders.component';
import { MyOrderComponent } from './pages/my-order/my-order.component';
import { UsersListComponent } from './pages/users-list/users-list.component';
import { UserDetailComponent } from './user-detail/user-detail.component';


const routes: Routes = [
  {
    path: '',
    canActivate: [NoAuthGuardService],
    component: LoginComponent
  },
  {
    path: 'login',
    canActivate: [NoAuthGuardService],
    component: LoginComponent
  },
  {
    path: 'cart',
    component: MainLayoutComponent ,
    canActivate: [AuthGuardService],
    children:[
      {path:'',component:CartComponent}
    ]
  },
  {
    path:'products',
    component: MainLayoutComponent ,
    canActivate: [AuthGuardService, AdminGuardService],
    children:[
      {path:'',component:ProductsListComponent},
      {path:'new',component:ProductDetailsComponent},
      {path:':id',component:ProductDetailsComponent}
    ]
  },
  {
    path:'orders',
    component: MainLayoutComponent ,
    canActivate: [AuthGuardService, AdminGuardService],
    children:[
      {path:'',component:OrdersListComponent},
      {path:':id',component:OrderDetailsComponent}
    ]
  },
  {
    path:'callback',
    component: CallbackComponent 
  },
  {
    path:'catalog',
    component: MainLayoutComponent ,
    canActivate: [AuthGuardService],
    children:[
      {path:'',component:CatalogComponent}
    ]
  },
  {
    path:'my-orders',
    component: MainLayoutComponent ,
    canActivate: [AuthGuardService],
    children:[
      {path:'',component:MyOrdersComponent},
      {path:':id',component:MyOrderComponent}    
    ]
  },
  {
    path:'ingredients',
    component: MainLayoutComponent ,
    canActivate: [AuthGuardService, AdminGuardService],
    children:[
      {path:'',component:IngredientsListComponent},
      {path:'new',component:IngredientDetailsComponent},
      {path:':id',component:IngredientDetailsComponent}
    ]
  },
  {
    path:'users',
    component: MainLayoutComponent ,
    canActivate: [AuthGuardService, AdminGuardService],
    children:[
      {path:'',component:UsersListComponent},
      {path:':id',component:UserDetailComponent}
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
