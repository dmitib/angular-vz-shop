import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CommentsComponent } from './components/comments/comments.component';
import { CommentsService } from './services/comments.service';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [CommentsComponent],
  exports: [CommentsComponent],
  providers: [CommentsService]
})
export class CommentsModule {}
