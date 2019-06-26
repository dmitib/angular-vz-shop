import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  FormArray
} from '@angular/forms';

import { Subscription } from 'rxjs';

import { Store } from '@ngrx/store';

import { Order, DeliveryType } from '../orders/models/order.model';
import { CartService } from '../cart/services/cart.service';
import { PopupService } from '../core/services/popup.services';
import { OrderService } from '../orders/services/order.service';
import { AutoUnsubscribe } from '../core/decorators';
import { AppState } from '../core/state/app.state';
import { Go } from '../core/state/router/router.actions';
import { getIsoDate } from '../core/helpers/date.helper';
import { CustomValidators } from '../validators/custom.validators';
import { ValidateAddressService } from '../validators/services/validate-address.service';
import { VALIDATION_MESSAGES } from '../orders/constants/validation-messages';
import { CartItem } from '../cart/models/cart-item.model';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss'],
})
@AutoUnsubscribe()
export class OrderFormComponent implements OnInit {
  cartItems: CartItem[];
  cartTotalSum: number;
  orderForm: FormGroup;
  private readonly emailPattern = '[a-z0-9._%+-]+@[a-z0-9.-]+';
  DeliveryType = DeliveryType;

  private sub: Subscription = new Subscription();

  constructor(
    private cartService: CartService,
    private popupService: PopupService,
    private store: Store<AppState>,
    private orderService: OrderService,
    private fb: FormBuilder,
    private validateAddressService: ValidateAddressService
  ) { }

  ngOnInit() {
    this.cartItems = this.cartService
      .getItems()
      .filter(item => item.count > 0);

    this.buildForm();
    this.watchDeliveryTypeChange();
    this.onDeliveryTypeChange(DeliveryType.byAddress);

    this.sub.add(this.cartService
      .getSum()
      .subscribe(sum => (this.cartTotalSum = sum)));
  }

  onProcessOrder() {
    const order: Order = {
      id: 0,
      cartItems: this.cartItems,
      date: getIsoDate(new Date()),
      name: this.orderForm.get('name').value,
      phones: this.phones.controls.map(c => c.value),
      deliveryAddress: this.orderForm.get('deliveryAddress').value,
      deliveryDate: this.orderForm.get('deliveryDate').value,
      deliveryType: this.orderForm.get('deliveryType').value,
      email: this.orderForm.get('email').value,
      remark: this.orderForm.get('remark').value
    };

    this.orderService.addOrder(order).subscribe(() => {
      this.cartService.emptyCart();
      this.store.dispatch(new Go({ path: ['/products-list'] }));
    });
  }

  get phones(): FormArray {
    return this.orderForm.get('phones') as FormArray;
  }

  cancelOrder() {
    this.popupService.confirm('Are you really want to cancel order?').then(
      result => {
        if (result) {
          this.cartService.emptyCart();
          this.store.dispatch(new Go({ path: ['/products-list'] }));
        }
      }
    );
  }

  private buildForm() {
    const deliveryDate = this.getDeliveryDate();

    this.orderForm = this.fb.group({
      name: new FormControl('', {
        validators: [Validators.required],
        updateOn: 'blur'
      }),
      phones: this.fb.array([this.buildPhoneFormControl()]),
      deliveryType: DeliveryType.byAddress,
      deliveryAddress: new FormControl('', { updateOn: 'blur' }),
      deliveryDate: [
        getIsoDate(deliveryDate),
        [Validators.required, CustomValidators.minDate(deliveryDate)]
      ],
      email: [
        '',
        [Validators.maxLength(50), Validators.pattern(this.emailPattern)]
      ],
      remark: ['', [Validators.maxLength(1000)]]
    });
  }

  private getDeliveryDate(): Date {
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 3);
    deliveryDate.setHours(0, 0, 0, 0);

    return deliveryDate;
  }

  controlIsInvalid(control: FormControl): boolean {
    return (control.touched || control.dirty) && control.invalid;
  }

  controlHasErrors(control: FormControl): boolean {
    return (control.touched || control.dirty) && !!control.errors;
  }

  private onDeliveryTypeChange(type: DeliveryType) {
    const deliveryAddressControl = this.orderForm.get('deliveryAddress');
    switch (type) {
      case DeliveryType.self:
        deliveryAddressControl.clearValidators();
        break;
      case DeliveryType.byAddress:
        deliveryAddressControl.setValidators([
          Validators.required,
          Validators.maxLength(100)
        ]);
        deliveryAddressControl.setAsyncValidators([
          CustomValidators.validAddress(this.validateAddressService)
        ]);
        break;
      default:
        break;
    }

    deliveryAddressControl.updateValueAndValidity();
  }

  private watchDeliveryTypeChange() {
    this.sub.add(
      this.orderForm
        .get('deliveryType')
        .valueChanges.subscribe((type: DeliveryType) =>
          this.onDeliveryTypeChange(type)
        )
    );
  }

  getControlErrorMessages(
    control: FormControl,
    section: string
  ): string[] | undefined {
    let messages: string[];

    if (control.errors) {
      messages = Object.keys(control.errors).map(
        error => VALIDATION_MESSAGES[section][error]
      );
    }

    return messages;
  }

  private buildPhoneFormControl(): FormControl {
    return new FormControl('', {
      validators: [Validators.required, Validators.maxLength(50)]
    });
  }

  onAddPhone() {
    this.phones.push(this.buildPhoneFormControl());
  }

  onRemovePhone(index: number) {
    this.phones.removeAt(index);
  }
}
