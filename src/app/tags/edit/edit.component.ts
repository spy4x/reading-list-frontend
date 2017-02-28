import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Tag } from '../tag.model';
import { State, DataState } from '../../_general/store/app.state';
import { TagEditAction } from '../../_general/store/tags/tagEdit.action';

@Component({
  selector: 'rl-tags-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class TagsEditComponent implements OnInit, OnDestroy {
  tagId: string;
  tag: Tag;
  private routeParamsSub: Subscription;

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
        return {id: params['id'], tags: state.tags};
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
    this.router.navigate(['/tags']);
  }

  cancel (): void {
    this.router.navigate(['/tags']);
  }

}
