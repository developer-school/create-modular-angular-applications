import { Component, OnInit } from '@angular/core';
import { CheckoutService } from 'src/app/checkout/services/checkout.service';
import type { Item } from 'src/app/inventory/models/item';
import { CartCheckout } from 'src/app/shopping-cart/models/cart';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.css'],
})
export class CartListComponent implements OnInit {
  cartList = this.cartService.cartList;

  constructor(
    public cartService: CartService,
    private checkout: CheckoutService
  ) {}

  ngOnInit(): void {
    this.cartService.getCartList().subscribe();
  }

  trackItem(_: number, item: Item) {
    return item.id;
  }

  checkoutCart(event: CartCheckout) {
    this.checkout.checkout(event);
  }
}
