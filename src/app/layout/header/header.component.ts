import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { Subscription } from 'rxjs';

import { CartService } from '../../cart';
import { AutoUnsubscribe } from '../../core/decorators';

@AutoUnsubscribe()
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  cartTotalCount: number;
  expanded: boolean;

  private sub: Subscription = new Subscription();

  constructor(private cartService: CartService) {}

  @ViewChild('appTitle') title: ElementRef;

  ngOnInit() {
    const title: HTMLHeadingElement = this.title.nativeElement;
    title.innerText = 'VZ-Shop App';

    this.sub.add(this.cartService
      .getCount()
      .subscribe(count => (this.cartTotalCount = count)));
  }

  onToggleMenu() {
    this.expanded = !this.expanded;
  }
}
