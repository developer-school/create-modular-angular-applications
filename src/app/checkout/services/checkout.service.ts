import { Injectable } from '@angular/core';
import type { CartCheckout } from 'src/app/shopping-cart/models/cart';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  constructor() {}

  checkout(cart: CartCheckout) {
    return alert(`Checked out for £${cart.total}`);
  }
}
