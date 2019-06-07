import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CartListComponent, CartItemComponent } from './components';
import { SharedModule } from '../shared';

@NgModule({
  declarations: [CartListComponent, CartItemComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule
  ],
  exports: [CartListComponent]
})
export class CartModule {}
