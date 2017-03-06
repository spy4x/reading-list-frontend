import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Item } from '../item.model';
import { Router } from '@angular/router';
import { State } from '../../../_general/store/app.state';
import { ItemAddAction } from '../../../_general/store/items/itemAdd.action';


@Component({
  selector: 'rl-items-add',
  templateUrl: 'add.component.html',
  styleUrls: ['add.component.css']
})
export class ItemsAddComponent implements OnInit {

  constructor (private store: Store<State>, private router: Router) {
  }

  ngOnInit () {
  }

  save (item: Item) {
    this.store.dispatch(new ItemAddAction(item));
    this.router.navigate(['/']);
  }

}
