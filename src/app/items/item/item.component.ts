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

  constructor (private service: ItemsService) {
  }

  ngOnInit () {
  }

  visitURL (): void {
    this.service.update(this.item, {viewed: true});
    console.log('mark as viewed?');
  }

  markAsUnseen (): void {
    this.service.update(this.item, {viewed: false});
  }

  remove (): void {
    this.service.remove(this.item);
  }
}
