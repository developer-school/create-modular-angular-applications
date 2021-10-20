import { Component, Input, OnInit } from '@angular/core';
import { CheckoutService } from 'src/app/checkout/services/checkout.service';
import type { Item } from 'src/app/inventory/models/item';

@Component({
  selector: 'app-cart-total',
  templateUrl: './cart-total.component.html',
  styleUrls: ['./cart-total.component.css'],
})
export class CartTotalComponent implements OnInit {
  @Input() items!: Item[];

  constructor(private checkoutService: CheckoutService) {}

  ngOnInit(): void {}

  checkout() {
    this.checkoutService.checkout({
      items: this.items,
      total: this.total,
    });
  }

  get total() {
    return this.items.reduce(
      (prev, curr) => prev + curr.price * curr.quantity,
      0
    );
  }
}
