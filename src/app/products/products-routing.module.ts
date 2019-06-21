import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { CommentsComponent } from '../comments/components/comments/comments.component';

const routes: Routes = [
  { path: 'products-list', component: ProductListComponent },
  {
    path: 'product/:productID',
    component: ProductDetailsComponent,
    children: [
      { path: 'comments', component: CommentsComponent, outlet: 'comments' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule {}
