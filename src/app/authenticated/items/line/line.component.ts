/* tslint:disable:max-line-length */
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  EventEmitter,
  Output
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Item, Priority } from '../item.model';
import { State } from '../../../_general/store/app.state';

import { ItemRemoveAction } from '../../../_general/store/items/itemRemove.action';
import { ItemEditAction } from '../../../_general/store/items/itemEdit.action';
import { IntroConfig } from '../../../_shared/_services/introduce/introduce.service';
/* tslint:enable:max-line-length */

@Component({
  selector: 'rl-items-line',
  templateUrl: 'line.component.html',
  styleUrls: ['line.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemsLineComponent implements OnInit {

  @Input() item: Item;
  @Input() previewMode: boolean;
  @Input() previewEditButtonDisabled: boolean;
  @Output() previewEditButtonClick = new EventEmitter();

  constructor (private store: Store<State>) {
  }

  ngOnInit () {
  }

  visitURL (): void {
    this.store.dispatch(new ItemEditAction({
      item: this.item,
      changes: {viewedAt: new Date()}
    }));
  }

  markAsUnseen (): void {
    this.store.dispatch(new ItemEditAction({
      item: this.item,
      changes: {viewedAt: undefined}
    }));
  }

  remove (): void {
    this.store.dispatch(new ItemRemoveAction(this.item));
  }

  getPriorityString (priority: number): string {
    return Priority[priority];
  }

  getPriorityClass (priority: number): string {
    switch (priority) {
      case 1:
        return 'success';
      case 2:
        return 'info';
      case 3:
        return 'default';
      default:
        return 'danger';
    }
  }
}

export const itemsLineComponentIntroConfig: IntroConfig = {
  steps: [],
  hints: [
    {
      element: 'rl-items-line .dropdown-toggle',
      hint: 'More actions with link',
      hintPosition: 'top-middle',
      position: 'auto'
    },
    {
      element: 'rl-items-line .text .title-hint',
      hint: 'Click on link\'s title to open it in new browser tab',
      hintPosition: 'top-middle',
      position: 'auto'
    },
    {
      element: 'rl-items-line .text .tag-hint',
      hint: 'Click on link\'s tag to search for other links with this tag' +
      ' (Work in progress)',
      hintPosition: 'top-middle',
      position: 'auto'
    },
    {
      element: 'rl-items-line .text .priority-hint',
      hint: 'Click on link\'s priority to search for other links with this ' +
      'priority (Work in progress)',
      hintPosition: 'top-middle',
      position: 'auto'
    },
    {
      element: 'rl-items-line .preview-button',
      hint: 'Click to edit title, image URL and description of link',
      hintPosition: 'top-left',
      position: 'auto'
    }
  ]
};

