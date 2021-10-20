import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { InventoryListComponent } from './components/inventory-list/inventory-list.component';
import { ItemCardComponent } from './components/item-card/item-card.component';

@NgModule({
  declarations: [InventoryListComponent, ItemCardComponent],
  imports: [CommonModule],
  exports: [InventoryListComponent],
})
export class InventoryModule {}
