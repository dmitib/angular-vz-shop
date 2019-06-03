import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { HighlightDirective, BackgroundDirective } from './directives';

@NgModule({
  declarations: [
    HighlightDirective,
    BackgroundDirective
  ],
  imports: [CommonModule],
  exports: [
    HighlightDirective,
    BackgroundDirective
  ]
})
export class SharedModule {}
