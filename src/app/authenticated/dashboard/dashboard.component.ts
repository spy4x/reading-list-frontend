import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Item } from '../items/item.model';
import { State, DataState } from '../../_general/store/app.state';

@Component({
  selector: 'rl-dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  items: Item[];

  constructor (private store: Store<State>) {
    this.store.select<DataState>('data')
      .map(state => Array.from(state.items.values()))
      .subscribe(items => this.items = items);
  }

  ngOnInit () {
  }

}
