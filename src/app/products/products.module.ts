import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared';
import { ProductListComponent, ProductComponent } from './components';

@NgModule({
  declarations: [ProductComponent, ProductListComponent],
  imports: [CommonModule, SharedModule],
  exports: [ProductListComponent]
})
export class ProductsModule {}
