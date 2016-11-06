import { Component, OnInit, Input } from '@angular/core';
import { Item } from '../item.model';

@Component({
  selector: 'rl-items-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ItemsListComponent implements OnInit {

  @Input() items: Item[];

  constructor () {
  }

  ngOnInit () {
  }

}
