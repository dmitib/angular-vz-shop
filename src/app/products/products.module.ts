import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared';
import { ProductListComponent, ProductComponent } from './components';
import { ProductsService } from './services';

@NgModule({
  declarations: [ProductComponent, ProductListComponent],
  imports: [CommonModule, SharedModule],
  // Сервис уже зарегистрирован
  // providers: [ProductsService],
  exports: [ProductListComponent]
})
export class ProductsModule {}
