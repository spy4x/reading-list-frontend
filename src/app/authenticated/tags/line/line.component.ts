/* tslint:disable:max-line-length */
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
import { IntroConfig } from '../../../_shared/_services/introduce/introduce.service';
/* tslint:enable:max-line-length */

@Component({
  selector: 'rl-tags-line',
  templateUrl: 'line.component.html',
  styleUrls: ['line.component.sass'],
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

export const tagsLineComponentIntroConfig: IntroConfig = {
  steps: [],
  hints: [
    {
      element: 'rl-tags-line .dropdown-toggle',
      hint: 'More actions with tag',
      hintPosition: 'top-middle',
      position: 'auto'
    },
    {
      element: 'rl-tags-line .title-hint',
      hint: 'Click on tag\'s name to search for links with this tag (Work in' +
      ' progress)',
      hintPosition: 'top-left',
      position: 'auto'
    }
  ]
};
