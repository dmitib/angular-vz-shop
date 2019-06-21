import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { OrderFormComponent } from './order-form.component';
import { OrderService } from './services/order.service';

@NgModule({
  declarations: [
    OrderFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  providers: [
    OrderService
  ],
  exports: [
    OrderFormComponent
  ]
})
export class OrdersModule { }
