import { Component, Input, OnInit } from '@angular/core';
import { CartService } from 'src/app/shopping-cart/services/cart.service';
import type { Item } from '../../models/item';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.css'],
})
export class ItemCardComponent implements OnInit {
  @Input() item!: Item;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {}

  // Add item to cart
  addToCart(item: Item) {
    this.cartService.add(item, 1).subscribe();
  }

  // Remove item from cart
  removeFromCart(item: Item) {
    this.cartService.remove(item, 1).subscribe();
  }
}
