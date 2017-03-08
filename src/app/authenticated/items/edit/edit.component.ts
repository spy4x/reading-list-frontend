import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Item } from '../item.model';
import { DataState, State } from '../../../_general/store/app.state';
import { ItemEditAction } from '../../../_general/store/items/itemEdit.action';
import { Tag } from '../../tags/tag.model';

@Component({
  selector: 'rl-items-edit',
  templateUrl: 'edit.component.html',
  styleUrls: ['edit.component.css']
})
export class ItemsEditComponent implements OnInit, OnDestroy {
  item: Item;
  tags: Tag[];
  routeParamsSub: Subscription;

  constructor (private store: Store<State>,
               private location: Location,
               private route: ActivatedRoute) {
  }

  ngOnInit () {
    this.routeParamsSub = this.route.params
      .combineLatest(this.store.select<DataState>('data'))
      .map((values: [Params, DataState]) => {
        this.tags = Array.from(values[1].tags.values());
        return {id: values[0]['id'], items: values[1].items};
      })
      .subscribe((values: {id: string, items: Map<string, Item>}) => {
        this.item = values.items.get(values.id);
      });
  }

  ngOnDestroy () {
    this.routeParamsSub.unsubscribe();
  }

  save (changes: any) {
    this.store.dispatch(new ItemEditAction({
      item: this.item,
      changes
    }));
    this.location.back();
  }

  cancel () {
    this.location.back();
  }

}
