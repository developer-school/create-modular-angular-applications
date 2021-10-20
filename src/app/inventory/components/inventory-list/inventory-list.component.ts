import { Component, OnInit } from '@angular/core';
import type { Item } from 'src/app/inventory/models/item';
import { InventoryService } from '../../services/inventory.service';

@Component({
  selector: 'app-inventory-list',
  templateUrl: './inventory-list.component.html',
  styleUrls: ['./inventory-list.component.css'],
})
export class InventoryListComponent implements OnInit {
  inventory = this.inventoryService.inventoryList;

  constructor(public inventoryService: InventoryService) {}

  ngOnInit(): void {
    this.inventoryService.get().subscribe();
  }

  trackItem(_: number, item: Item) {
    return item.id;
  }
}
