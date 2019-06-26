import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';

import { select, Store } from '@ngrx/store';

import { ProductModel } from '../../models/product.model';
import { CommentsService } from '../../../comments/services/comments.service';
import { AppState } from '../../../core/state/app.state';
import { Go } from '../../../core/state/router/router.actions';
import { GetProductFromUrl } from '../../../core/state/products/products.actions';
import { getSelectedProduct } from '../../../core/state/products/products.selectors';

@Component({
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  product: ProductModel;

  private sub: Subscription;

  constructor(
    public commentsService: CommentsService,
    private store: Store<AppState>
  ) {}

   ngOnInit() {
    this.store.dispatch(new GetProductFromUrl());
    this.sub = this.store
      .pipe(select(getSelectedProduct))
      .subscribe(product => (this.product = product));
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  onGoBack() {
    this.commentsService.isDisplayed = false;
    this.store.dispatch(new Go({ path: ['/products-list'] }));
  }

  toggleComments(display: boolean) {
    this.commentsService.activeProductId = this.product.id;
    this.commentsService.isDisplayed = display;
    this.store.dispatch(
      new Go({
        path: [
          '/product',
          this.product.id,
          { outlets: { feedback: display ? ['feedback'] : null } }
        ]
      })
    );
  }
}
