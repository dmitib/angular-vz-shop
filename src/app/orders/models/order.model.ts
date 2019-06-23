import { CartItem } from 'src/app/cart/models/cart-item.model';

export interface Order {
  id: number;
  cartItems: CartItem[];
  date: string;
  name: string;
  deliveryAddress: string;
}
