import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CartListComponent, CartItemComponent } from './components';

@NgModule({
  declarations: [CartListComponent, CartItemComponent],
  imports: [CommonModule],
  exports: [CartListComponent]
})
export class CartModule {}
