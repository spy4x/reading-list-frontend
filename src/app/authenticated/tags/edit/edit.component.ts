import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Tag } from '../tag.model';
import { State, DataState } from '../../../_general/store/app.state';
import { TagEditAction } from '../../../_general/store/tags/tagEdit.action';

@Component({
  selector: 'rl-tags-edit',
  templateUrl: 'edit.component.html',
  styleUrls: ['edit.component.css']
})
export class TagsEditComponent implements OnInit, OnDestroy {
  tag: Tag;
  private routeParamsSub: Subscription;

  constructor (private store: Store<State>,
               private location: Location,
               private route: ActivatedRoute) {
  }

  ngOnInit () {
    this.routeParamsSub = this.route.params
      .combineLatest(this.store.select<DataState>('data'))
      .map((values: [Params, DataState]) => {
        return {id: values[0]['id'], tags: values[1].tags};
      })
      .subscribe((values: {id: string, tags: Map<string, Tag>}) => {
        this.tag = values.tags.get(values.id);
      });
  }

  ngOnDestroy () {
    this.routeParamsSub.unsubscribe();
  }

  save (changes: any): void {
    this.store.dispatch(new TagEditAction({
      tag: this.tag,
      changes
    }));
    this.location.back();
  }

  cancel (): void {
    this.location.back();
  }

}
