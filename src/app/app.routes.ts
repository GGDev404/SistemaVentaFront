import { Routes } from '@angular/router';
import { LoginComponent } from './Pages/auth/login/login.component';
import { DashboardComponent } from './Pages/auth/dashboard/dashboard.component';
import { ProductoDetalleComponent } from './components/producto-detalle/producto-detalle.component';
import { PayComponent } from './components/pay/pay.component';
import { PaySuccesComponent } from './components/pay-succes/pay-succes.component';

export const routes: Routes = [
  {path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path:'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'product/:id',
    component: ProductoDetalleComponent
  },
  {
    path: 'payment',
    component : PayComponent
  },
  {
    path : 'PaymentSucces',
    component : PaySuccesComponent
  }

];
