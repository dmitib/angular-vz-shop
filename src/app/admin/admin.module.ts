import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { ManageProductsComponent } from './components/manage-products/manage-products.component';
import { ManageOrdersComponent } from './components/manage-orders/manage-orders.component';
import { AdminComponent } from '../admin/admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { ManageOrderComponent } from './components/manage-order/manage-order.component';
import { ManageProductComponent } from './components/manage-product/manage-product.component';
import { ProductResolveGuard } from './guards/product-resolve.guard';
import { OrderResolveGuard } from './guards/order-resolve.guard';

@NgModule({
  declarations: [
    AdminDashboardComponent,
    ManageProductsComponent,
    ManageOrdersComponent,
    AdminComponent,
    ManageOrderComponent,
    ManageProductComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule
  ],
  providers: [
    ProductResolveGuard,
    OrderResolveGuard
  ]
})
export class AdminModule { }
