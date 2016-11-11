import { Component, OnInit } from '@angular/core';

import { ItemsService } from './items.service';
import { Item } from './item.model';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'rl-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
  items: Item[] = new Array<Item>();
  userAuthenticated: Boolean;

  constructor (private _service: ItemsService, private _auth: AuthService) {
    this._service.items.subscribe(items => this.items = items);
    this._auth.user.subscribe(user => this.userAuthenticated = !!user);
  }

  ngOnInit () {
  }

  save (data: {title, url, priority, type, keywords}): void {
    this._service.add(data);
  }

}
