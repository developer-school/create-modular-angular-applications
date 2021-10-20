import { Injectable } from '@angular/core';
import { EMPTY, Observable, of } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { map, switchMap, tap } from 'rxjs/operators';
import { HttpClientService } from 'src/app/shared/services/http-client.service';
import type { Item } from '../models/item';

@Injectable({
  providedIn: 'root',
})
export class InventoryService {
  inventoryList = new BehaviorSubject<Item[]>([]);

  constructor(private http: HttpClientService) {}

  get() {
    return this.http
      .get<Item[]>('inventory')
      .pipe(tap((inventory: Item[]) => this.inventoryList.next(inventory)));
  }

  increment(id: number, amount: number) {
    return this.findItem(id).pipe(
      tap((item: Item) => console.log(`Updating the stock of ${item.name}`)),
      map((item: Item) => ({
        ...item,
        quantity: item.quantity + amount,
      })),
      switchMap((item: Item) => this.http.put(`inventory/${item.id}`, item)),
      tap((item: Item) =>
        this.inventoryList.next(
          this.inventoryList
            .getValue()
            .map((i) => (i.id === item.id ? item : i))
        )
      )
    );
  }

  deduct(id: number, amount: number) {
    return this.findItem(id).pipe(
      tap((item: Item) => console.log(`Updating the stock of ${item.name}`)),
      map((item: Item) => ({
        ...item,
        quantity: item.quantity - amount,
      })),
      switchMap((item: Item) => this.http.put(`inventory/${item.id}`, item)),
      tap((item: Item) =>
        this.inventoryList.next(
          this.inventoryList
            .getValue()
            .map((i) => (i.id === item.id ? item : i))
        )
      )
    );
  }

  private findItem(id: number): Observable<Item | never> {
    const item = this.inventoryList.getValue().find((i) => i.id === id);

    if (!item) {
      return EMPTY;
    }

    return of(item);
  }
}
