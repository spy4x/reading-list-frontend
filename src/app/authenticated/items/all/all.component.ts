import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Item } from '../item.model';
import { State, DataState } from '../../../_general/store/app.state';

@Component({
  selector: 'rl-items-all',
  templateUrl: 'all.component.html',
  styleUrls: ['all.component.css']
})
export class ItemsAllComponent implements OnInit {

  items: Item[];

  constructor (private store: Store<State>) {
    this.store.select<DataState>('data')
      .map(state => Array.from(state.items.values()))
      .subscribe(items => this.items = items);
  }

  ngOnInit () {
  }
}
