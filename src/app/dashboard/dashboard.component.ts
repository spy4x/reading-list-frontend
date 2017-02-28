import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State, DataState } from '../_general/store/app.state';
import { Item } from '../items/item.model';

@Component({
  selector: 'rl-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  items: Item[];

  constructor (private store: Store<State>) {
    this.store.select('data')
      .map((state: DataState) => Array.from(state.items.values()))
      .subscribe(items => this.items = items);
  }

  ngOnInit () {
  }

}
