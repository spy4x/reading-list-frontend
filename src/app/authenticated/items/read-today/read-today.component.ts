import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges
} from '@angular/core';
import { Item } from '../item.model';

@Component({
  selector: 'rl-items-read-today',
  templateUrl: 'read-today.component.html',
  styleUrls: ['read-today.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemsReadTodayComponent implements OnInit, OnChanges {
  private readonly MAX_ITEMS_VISIBLE = 3;

  @Input() items: Item[];
  public filteredItems: Item[];

  constructor () {
  }

  ngOnInit () {
  }

  ngOnChanges (changes: SimpleChanges): void {
    this.filteredItems = this.items.filter(item => !item.viewedAt);
    this.filteredItems = this.filteredItems.sort((item1, item2) => {
      if (item1.priority > item2.priority) {
        return 1;
      }
      if (item1.priority < item2.priority) {
        return -1;
      }
      // else compare titles
      return item1.title.localeCompare(item2.title);
    });

    this.filteredItems = this.filteredItems.slice(0, this.MAX_ITEMS_VISIBLE);
  }

}
