import { CartItem } from '../../cart/models/cart-item.model';

export interface Order {
  id: number;
  cartItems: CartItem[];
  date: Date;
  name: string;
  deliveryAddress: string;
}
