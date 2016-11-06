import { Component, OnInit, Input } from '@angular/core';
import { Item } from '../item.model';
import { ItemsService } from '../items.service';

@Component({
  selector: 'rl-items-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemsItemComponent implements OnInit {

  @Input() item: Item;
  editMode: boolean;

  constructor (private service: ItemsService) {
  }

  ngOnInit () {
  }

  getIconByItemType (type: string): string {
    switch (type) {
      case 'article':
        return 'text_format';
      case 'video':
        return 'live_tv';
      case 'guide':
        return 'assistant';
      default:
        return 'plus_one';
    }
  }

  visitURL (): void {
    this.service.update(this.item, {viewed: true});
  }

  toggleEdit (): void {
    this.editMode = !this.editMode;
  }

  markAsUnseen (): void {
    this.service.update(this.item, {viewed: false});
  }

  remove (): void {
    this.service.remove(this.item);
  }

  save (itemChanges): void {
    this.service.update(this.item, itemChanges);
    this.toggleEdit();
  }

}
