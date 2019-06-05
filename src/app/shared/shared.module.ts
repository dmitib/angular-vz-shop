import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { HighlightDirective, BackgroundDirective } from './directives';

// Так будет короче
const decl = [HighlightDirective, BackgroundDirective];
@NgModule({
  declarations: [...decl],
  imports: [CommonModule],
  exports: [...decl]
})
export class SharedModule {}
