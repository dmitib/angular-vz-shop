import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './admin.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { ManageProductsComponent } from './components/manage-products/manage-products.component';
import { ManageOrdersComponent } from './components/manage-orders/manage-orders.component';
import { ManageProductComponent } from './components/manage-product/manage-product.component';
import { ManageOrderComponent } from './components/manage-order/manage-order.component';
import { CanDeactivateGuard } from './guards/can-deactivate.guard';
import { ProductResolveGuard } from './guards/product-resolve.guard';
import { OrderResolveGuard } from './guards/order-resolve.guard';
import { AuthGuard } from '../core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        canActivateChild: [AuthGuard],
        children: [
          { path: 'products', component: ManageProductsComponent },
          {
            path: 'product',
            children: [
              { path: 'add', component: ManageProductComponent },
              {
                path: 'edit/:productID',
                component: ManageProductComponent,
                canDeactivate: [CanDeactivateGuard],
                resolve: {
                  product: ProductResolveGuard
                }
              }
            ]
          },
          { path: 'orders', component: ManageOrdersComponent },
          {
            path: 'order',
            children: [
              {
                path: 'edit/:orderID',
                component: ManageOrderComponent,
                canDeactivate: [CanDeactivateGuard],
                resolve: {
                  order: OrderResolveGuard
                }
              }
            ]
          },
          { path: '', component: AdminDashboardComponent }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
