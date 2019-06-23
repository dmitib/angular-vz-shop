import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Subscription } from 'rxjs';
import { pluck } from 'rxjs/operators';

import { CanComponentDeactivate } from '../../../core/interfaces/can-component-deactivate.interface';
import { PopupService } from '../../../core/services/popup.services';
import { Order } from '../../../orders/models/order.model';
import { OrderService } from '../../../orders/services/order.service';

@Component({
  selector: 'app-manage-order',
  templateUrl: './manage-order.component.html',
  styleUrls: ['./manage-order.component.scss']
})
export class ManageOrderComponent implements OnInit, CanComponentDeactivate {
  order: Order;
  originalOrder: Order;
  private sub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private router: Router,
    private popupService: PopupService,
    private orderService: OrderService
  ) {}

  ngOnInit() {
    this.route.data.pipe(pluck('order')).subscribe((order: Order) => {
      this.order = { ...order };
      this.originalOrder = { ...order };
    });
  }

  canDeactivate(): Promise<boolean> | boolean {
    const flags = Object.keys(this.originalOrder).map(key => {
      if (this.originalOrder[key] === this.order[key]) {
        return true;
      }
      return false;
    });

    if (flags.every(el => el)) {
      return true;
    }

    // Otherwise ask the user with the popup service and return its
    // promise which resolves to true or false when the user decides
    return this.popupService.confirm('Discard changes?');
  }

  onSave() {
    const order = { ...this.order };
    this.sub = this.orderService.editOrder(order).subscribe(o => {
      this.originalOrder = { ...o };
      this.order = { ...o };
      this.onGoBack();
    });
  }

  onGoBack() {
    this.location.back();
  }
}
