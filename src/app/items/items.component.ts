import { Component, OnInit } from '@angular/core';

import { ItemsService } from './items.service';
import { Item } from './item.model';

@Component({
  selector: 'rl-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
  items: Item[];

  constructor (private service: ItemsService) {
    this.items = service.items;
  }

  ngOnInit () {
  }

  save (data: {title, url, priority, type, keywords}): void {
    // console.log('data in ItemsComponent:', data);
    this.service.add(data);
  }

}
