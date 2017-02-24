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
  selector: 'rl-items-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemsListComponent implements OnInit, OnChanges {

  @Input() items: Item[];
  public sortedItems: Item[];

  constructor () {
  }

  ngOnInit () {
  }

  ngOnChanges (changes: SimpleChanges): void {
    this.sortedItems = this.items.sort((item1, item2) => {
      if (item1.createdAt > item2.createdAt) {
        return 1;
      }
      if (item1.createdAt < item2.createdAt) {
        return -1;
      }
      // else compare titles
      return item1.title.localeCompare(item2.title);
    });
  }

}
