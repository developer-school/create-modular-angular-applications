import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { switchMapTo, tap } from 'rxjs/operators';
import type { Item } from 'src/app/inventory/models/item';
import { InventoryService } from 'src/app/inventory/services/inventory.service';
import { HttpClientService } from 'src/app/shared/services/http-client.service';
import type { Cart } from 'src/app/shopping-cart/models/cart';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartList = new BehaviorSubject<Cart>([]);

  constructor(
    private http: HttpClientService,
    private inventory: InventoryService
  ) {}

  getCartList() {
    return this.http
      .get<Cart>('cart')
      .pipe(tap((cart: Cart) => this.cartList.next(cart)));
  }

  add(cartItem: Item, amount: number) {
    const cart = this.cartList.getValue();

    const existingItem: Item | undefined = cart.find(
      (item) => item.id === cartItem.id
    );

    if (existingItem) {
      return this.update(existingItem, amount);
    }

    const newItem = { ...cartItem, quantity: amount };

    return this.http.post<Item>('cart', newItem).pipe(
      tap(() => console.log(`Adding ${newItem.name} to the cart.`, newItem)),
      tap(() => this.cartList.next(cart.concat(newItem))),
      switchMapTo(this.inventory.deduct(newItem.id, amount))
    );
  }

  update(cartItem: Item, amount: number) {
    const cart = this.cartList.getValue();

    console.log(amount);

    const itemWithUpdatedAmount: Item = {
      ...cartItem,
      quantity: cartItem.quantity + amount,
    };

    console.log(itemWithUpdatedAmount);

    return this.http
      .put<Item>(`cart/${cartItem.id}`, itemWithUpdatedAmount)
      .pipe(
        tap(() =>
          console.log(
            `Updating quantity of ${cartItem.name} in the cart`,
            cartItem
          )
        ),
        tap(() =>
          this.cartList.next(
            cart.map((existing) =>
              existing.id === cartItem.id ? itemWithUpdatedAmount : existing
            )
          )
        ),
        switchMapTo(this.inventory.deduct(cartItem.id, amount))
      );
  }

  // -1
  remove(cartItem: Item, amount: number) {
    const cart = this.cartList.getValue();
    const existingItem: Item | undefined = cart.find(
      (item) => item.id === cartItem.id
    );

    if (!existingItem) return of();

    if (existingItem.quantity === 1) {
      return this.http.delete<Item>(`cart/${cartItem.id}`).pipe(
        tap(() =>
          console.log(`Removing ${cartItem.name} from the cart.`, cartItem)
        ),
        tap(() =>
          this.cartList.next(cart.filter((item) => item.id !== cartItem.id))
        ),
        switchMapTo(this.inventory.deduct(cartItem.id, amount))
      );
    }

    return this.http
      .put<Item>(`cart/${cartItem.id}`, {
        ...cartItem,
        quantity: cartItem.quantity + amount,
      })
      .pipe(
        tap(() =>
          console.log(`Removing ${cartItem.name} from the cart.`, cartItem)
        ),
        tap(() =>
          this.cartList.next(
            cart.map((item) =>
              item.id === cartItem.id
                ? { ...item, quantity: item.quantity + amount }
                : item
            )
          )
        ),
        switchMapTo(this.inventory.increment(existingItem.id, amount * -1))
      );
  }
}
