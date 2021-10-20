import { Component, Input, OnInit } from '@angular/core';
import type { Item } from 'src/app/inventory/models/item';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css'],
})
export class CartItemComponent implements OnInit {
  @Input() item!: Item;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {}

  increment() {
    this.cartService.add(this.item, 1).subscribe();
  }

  decrement() {
    this.cartService.remove(this.item, -1).subscribe();
  }

  get totalPrice(): number {
    return this.item.price * this.item.quantity;
  }
}
