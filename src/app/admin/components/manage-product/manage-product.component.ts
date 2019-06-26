import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs';
import { filter, pluck } from 'rxjs/operators';

import { select, Store } from '@ngrx/store';

import { ProductModel } from '../../../products/models/product.model';
import { PopupService } from '../../../core/services/popup.services';
import { CanComponentDeactivate } from '../../../core/interfaces/can-component-deactivate.interface';
import { AppState } from '../../../core/state/app.state';
import * as pa from '../../../core/state/products/products.actions';
import {
  getProductEditComplete,
  getSelectedProduct
} from '../../../core/state/products/products.selectors';
import * as ra from '../../../core/state/router/router.actions';
import { AutoUnsubscribe } from 'src/app/core/decorators';

@Component({
  selector: 'app-manage-product',
  templateUrl: './manage-product.component.html',
  styleUrls: ['./manage-product.component.scss']
})
@AutoUnsubscribe()
export class ManageProductComponent implements OnInit, CanComponentDeactivate {
  product: ProductModel;
  originalProduct: ProductModel;
  private sub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private popupService: PopupService,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.sub = this.route.data
      .pipe(pluck('product'))
      .subscribe((product: ProductModel) => {
        this.product = { ...product };
        this.originalProduct = { ...product };
      });

    this.sub.add(
      this.store
        .pipe(
          select(getSelectedProduct),
          filter(product => !!product)
        )
        .subscribe(product => {
          this.product = { ...product };
          this.originalProduct = { ...product };
        })
    );

    this.sub.add(
      this.store
        .pipe(
          select(getProductEditComplete),
          filter(editComplete => editComplete)
        )
        .subscribe(() => this.onGoBack())
    );
  }

  canDeactivate(): Promise<boolean> | boolean {
    const flags = Object.keys(this.originalProduct).map(key => {
      if (this.originalProduct[key] === this.product[key]) {
        return true;
      }
      return false;
    });

    if (flags.every(el => el)) {
      return true;
    }

    // Otherwise ask the user with the dialog service and return its
    // promise which resolves to true or false when the user decides
    return this.popupService.confirm('Discard changes?');
  }

  async onSaveProduct() {
    const product = { ...this.product };
    if (product.id) {
      this.store.dispatch(new pa.EditProduct(product));
    } else {
      this.store.dispatch(new pa.AddProduct(product));
    }
  }

  onGoBack() {
    this.store.dispatch(new ra.Back());
  }
}
