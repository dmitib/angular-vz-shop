import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { OrderFormComponent } from './order-form.component';
import { OrderService } from './services/order.service';
import { ValidatorsModule } from '../validators/validators.module';

@NgModule({
  declarations: [
    OrderFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    ValidatorsModule
  ],
  providers: [
    OrderService
  ],
  exports: [
    OrderFormComponent
  ]
})
export class OrdersModule { }
