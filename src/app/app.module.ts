import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { CheckoutModule } from './checkout/checkout.module';
import { InventoryModule } from './inventory/inventory.module';
import { ShoppingCartModule } from './shopping-cart/shopping-cart.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, ShoppingCartModule, InventoryModule, CheckoutModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
