import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Item } from '../item.model';
import { Location } from '@angular/common';
import { State, DataState } from '../../../_general/store/app.state';
import { ItemAddAction } from '../../../_general/store/items/itemAdd.action';
import { Tag } from '../../tags/tag.model';


@Component({
  selector: 'rl-items-add',
  templateUrl: 'add.component.html',
  styleUrls: ['add.component.css']
})
export class ItemsAddComponent implements OnInit {
  tags: Tag[];

  constructor (private store: Store<State>, private location: Location) {
  }

  ngOnInit () {
    this.store
      .select<DataState>('data')
      .map(data => data.tags)
      .subscribe(tags => {
        this.tags = Array.from(tags.values());
      });
  }

  save (item: Item) {
    this.store.dispatch(new ItemAddAction(item));
    this.location.back();
  }

  cancel () {
    this.location.back();
  }

}
