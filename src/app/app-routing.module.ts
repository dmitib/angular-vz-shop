import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CartListComponent } from './cart';
import { AboutComponent } from './layout/about/about.component';
import { PathNotFoundComponent } from './shared/components/path-not-found/path-not-found.component';
import { OrderFormComponent } from './orders/order-form.component';
import { LoginComponent } from './shared/components/login/login.component';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: 'cart',
    component: CartListComponent
  },
  {
    path: 'order',
    component: OrderFormComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'admin',
    canLoad: [AuthGuard],
    loadChildren: './admin/admin.module#AdminModule'
  },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/products-list', pathMatch: 'full' },
  { path: '**', component: PathNotFoundComponent },
  {
    path: '',
    redirectTo: '/products-list',
    pathMatch: 'full'
  },
  {
    // The router will match this route if the URL requested
    // doesn't match any paths for routes defined in our configuration
    path: '**',
    component: PathNotFoundComponent,
    data: { title: 'Page Not Found' }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
