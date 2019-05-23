import { Category } from './category';

export class ProductModel {
  name: string;
  description: string;
  price: number;
  category: Category;
  isAvailable: boolean;
}
