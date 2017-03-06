import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Item, Priority } from '../item.model';
import { State } from '../../../_general/store/app.state';
/* tslint:disable:max-line-length */
import { ItemRemoveAction } from '../../../_general/store/items/itemRemove.action';
/* tslint:enable:max-line-length */
import { ItemEditAction } from '../../../_general/store/items/itemEdit.action';

@Component({
  selector: 'rl-items-line',
  templateUrl: 'line.component.html',
  styleUrls: ['line.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemsLineComponent implements OnInit {

  @Input() item: Item;

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
        return 'warning';
      case 2:
        return 'info';
      case 3:
        return 'default';
      default:
        return 'danger';
    }
  }
}
