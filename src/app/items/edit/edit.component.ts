import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Item } from '../item.model';
import { State, DataState } from '../../_general/store/app.state';
import { ItemEditAction } from '../../_general/store/items/itemEdit.action';

@Component({
  selector: 'rl-items-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class ItemsEditComponent implements OnInit, OnDestroy {
  item: Item;
  routeParamsSub: Subscription;

  constructor (private store: Store<State>,
               private router: Router,
               private route: ActivatedRoute) {
  }

  ngOnInit () {
    this.routeParamsSub = this.route.params
      .combineLatest(this.store.select('data'))
      .map((values: any[]) => {
        const params = values[0] as Params;
        const state = values[1] as DataState;
        return {id: params['id'], items: state.items};
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
    this.router.navigate(['/']);
  }

  cancel () {
    this.router.navigate(['/']);
  }

}
