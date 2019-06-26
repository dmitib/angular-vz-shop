import { Injectable } from '@angular/core';

@Injectable()
export class CommentsService {
  isDisplayed = false;
  activeProductId: number;

   private comments = new Map<number, string[]>();

   add(productId: number, comment: string) {
    const date = new Date();
    const comments = this.comments.get(productId) || [];
    comments.push(`${comment} (${date.toLocaleString()})`);
    this.comments.set(this.activeProductId, comments);
  }

  // как-то не очент подходит название метода, если передается productId
   getAll(productId: number): string[] {
    return this.comments.get(productId);
  }
}
