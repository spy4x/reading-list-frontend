import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Tag } from '../tag.model';
import { State } from '../../../_general/store/app.state';
import { TagRemoveAction } from '../../../_general/store/tags/tagRemove.action';

@Component({
  selector: 'rl-tags-line',
  templateUrl: 'line.component.html',
  styleUrls: ['line.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TagsLineComponent implements OnInit {

  @Input() tag: Tag;

  constructor (private store: Store<State>) {
  }

  ngOnInit () {
  }

  searchBy (tag): void {
    // TODO: implement search by this tag
    console.log('No implementation for "Search by this tag" yet.');
  }

  remove (tag: Tag): void {
    this.store.dispatch(new TagRemoveAction(tag));
  }

}
