import { CartItem } from 'src/app/cart/models/cart-item.model';

export interface Order {
  id: number;
  cartItems: CartItem[];
  date: string;
  name: string;
  phones: string[];
  deliveryDate?: string;
  deliveryType: DeliveryType;
  deliveryAddress?: string;
  email?: string;
  remark?: string;
}

export enum DeliveryType {
  self,
  byAddress
}
