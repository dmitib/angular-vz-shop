import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CartListComponent, CartItemComponent } from './components';
import { SharedModule } from '../shared';

@NgModule({
  declarations: [CartListComponent, CartItemComponent],
  imports: [CommonModule, SharedModule],
  exports: [CartListComponent]
})
export class CartModule {}
