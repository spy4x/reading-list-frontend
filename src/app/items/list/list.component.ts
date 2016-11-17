import { Component, OnInit } from '@angular/core';
import { Item } from '../item.model';
import { ItemsService } from '../items.service';

@Component({
  selector: 'rl-items-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ItemsListComponent implements OnInit {

  items: Item[];

  constructor (private _service: ItemsService) {
    this._service.items.subscribe(items => this.items = items);
  }

  ngOnInit () {
  }

}
