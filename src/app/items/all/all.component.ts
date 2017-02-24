import { Component, OnInit } from '@angular/core';
import { Item } from '../item.model';
import { ItemsService } from '../items.service';

@Component({
  selector: 'rl-items-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.css']
})
export class ItemsAllComponent implements OnInit {

  items: Item[];

  constructor (private service: ItemsService) {
    this.service.items.subscribe(items => this.items = items);
  }

  ngOnInit () {
  }

}
