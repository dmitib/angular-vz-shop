import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { HighlightDirective, BackgroundDirective } from './directives';
import { OrderByPipe } from './pipes/order-by.pipe';

const decl = [HighlightDirective, BackgroundDirective, OrderByPipe];
@NgModule({
  declarations: [...decl],
  imports: [CommonModule],
  exports: [...decl]
})
export class SharedModule {}
