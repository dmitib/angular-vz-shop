import { Injectable } from '@angular/core';
import { JsonServerClientService } from 'src/app/core/services/json-server-client.service';
import { ProductModel } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private readonly endpoint = `products`;

  constructor(private jsonServerClient: JsonServerClientService) {}

  getProducts(): Promise<ProductModel[]> {
    return this.jsonServerClient
      .get<ProductModel[]>(this.endpoint)
      .toPromise()
      .catch(this.handleError);
  }

  getProduct(id: number): Promise<ProductModel> {
    return this.jsonServerClient
      .get<ProductModel>(this.endpoint + '/' + id)
      .toPromise()
      .catch(this.handleError);
  }

  async addProduct(product: ProductModel): Promise<ProductModel> {
    const products = await this.getProducts();
    const maxId = products
      .map(p => p.id)
      .reduce((prev, cur) => (prev < cur ? cur : prev));

    const productToAdd = {
      ...product,
      id: maxId + 1,
      updateDate: this.getUpdateDate()
    };

    return this.jsonServerClient
      .post<ProductModel>(this.endpoint, productToAdd)
      .toPromise()
      .catch(this.handleError);
  }

  editProduct(product: ProductModel): Promise<ProductModel> {
    const updateUrl = `${this.endpoint}/${product.id}`;
    const productToUpdate = {
      ...product,
      updateDate: this.getUpdateDate()
    };

    return this.jsonServerClient
      .put<ProductModel>(updateUrl, productToUpdate)
      .toPromise()
      .catch(this.handleError);
  }

  deleteProduct(id: number): Promise<{}> {
    const deleteUrl = `${this.endpoint}/${id}`;
    return this.jsonServerClient
      .delete(deleteUrl)
      .toPromise()
      .catch(this.handleError);
  }

  private handleError(error: { message?: string }): Promise<any> {
    console.error('An error occured', error);
    return Promise.reject(error.message || error);
  }

  private getUpdateDate(): string {
    return new Date().toISOString();
  }
}
