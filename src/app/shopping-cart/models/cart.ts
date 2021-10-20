import type { Item } from '../../inventory/models/item';

export type Cart = Item[];
export type CartCheckout = {
  items: Cart;
  total: number;
};
