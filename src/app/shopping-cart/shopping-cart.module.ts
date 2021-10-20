import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { CartItemComponent } from './components/cart-item/cart-item.component';
import { CartListComponent } from './components/cart-list/cart-list.component';
import { CartTotalComponent } from './components/cart-total/cart-total.component';

@NgModule({
  declarations: [CartListComponent, CartItemComponent, CartTotalComponent],
  imports: [SharedModule],
  exports: [CartListComponent],
})
export class ShoppingCartModule {}
