import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProductsComponent } from './products/products.component';
import { OrderComponent } from './order/order.component';

export const routes: Routes = [
  //{ path: 'login', component: LoginComponent }, // think having two of these was causing problems...
  { path: '', component: LoginComponent, pathMatch: 'full' },
  { path: 'product', component: ProductsComponent },
  { path: 'order', component: OrderComponent }
];
