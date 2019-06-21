import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { switchMap } from 'rxjs/operators';

import { ProductModel } from '../../models/product.model';
import { ProductsService } from '../../services/products.service';
import { CommentsService } from '../../../comments/services/comments.service';

@Component({
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product: ProductModel;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private productsService: ProductsService,
    public commentsService: CommentsService
  ) {}

   ngOnInit() {
    this.product = new ProductModel();

    this.activatedRoute.paramMap
      .pipe(
        switchMap((params: Params) =>
          this.productsService.getProduct(+params.get('productID'))
        )
      )
      .subscribe(
        product => (this.product = { ...product }),
        err => console.error(err)
      );
  }

  onGoBack() {
    this.commentsService.isDisplayed = false;
    this.router.navigate(['/products-list']);
  }

  toggleComments(display: boolean) {
    this.commentsService.activeProductId = this.product.id;
    this.commentsService.isDisplayed = display;
    if (display) {
      this.router.navigate(['/product', this.product.id, { outlets: { comments: ['comments'] } }]);
    } else {
      this.router.navigate(['/product', this.commentsService.activeProductId, { outlets: { comments: null } }]);
    }
  }
}
