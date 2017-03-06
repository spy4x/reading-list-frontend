import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Tag } from '../tag.model';
import { State, DataState } from '../../../_general/store/app.state';

@Component({
  selector: 'rl-tags-list',
  templateUrl: 'list.component.html',
  styleUrls: ['list.component.css']
})
export class TagsListComponent implements OnInit {
  tags: Tag[];

  constructor (private store: Store<State>) {
    this.store.select<DataState>('data')
      .map(state => Array.from(state.tags.values()))
      .map((tags: Tag[]) => tags.sort((tag1, tag2) => {
        return tag1.name.localeCompare(tag2.name);
      }))
      .subscribe(items => this.tags = items);
  }

  ngOnInit () {
  }
}
