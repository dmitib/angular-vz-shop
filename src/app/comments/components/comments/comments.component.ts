import { Component } from '@angular/core';
import { CommentsService } from '../../services/comments.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent {
  comments = '';

  constructor(
    public commentsService: CommentsService,
  ) {}

  onSend() {
    if (this.comments) {
      this.commentsService.add(this.commentsService.activeProductId, this.comments);
      this.comments = '';
    }
  }
}
