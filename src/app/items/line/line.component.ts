import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit
} from '@angular/core';
import { Item, Priority } from '../item.model';
import { ItemsService } from '../items.service';

@Component({
  selector: 'rl-items-line',
  templateUrl: './line.component.html',
  styleUrls: ['./line.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemsLineComponent implements OnInit {

  @Input() item: Item;

  constructor (private service: ItemsService) {
  }

  ngOnInit () {
  }

  visitURL (): void {
    this.service.update(this.item, {viewedAt: new Date()});
  }

  markAsUnseen (): void {
    this.service.update(this.item, {viewedAt: undefined});
  }

  remove (): void {
    this.service.remove(this.item);
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
