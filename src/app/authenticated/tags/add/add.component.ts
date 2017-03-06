import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Location } from '@angular/common';
import { Tag } from '../tag.model';
import { State } from '../../../_general/store/app.state';
import { TagAddAction } from '../../../_general/store/tags/tagAdd.action';


@Component({
  selector: 'rl-tags-add',
  templateUrl: 'add.component.html',
  styleUrls: ['add.component.css']
})
export class TagsAddComponent implements OnInit {

  constructor (private store: Store<State>, private location: Location) {
  }

  ngOnInit () {
  }

  save (tag: Tag) {
    this.store.dispatch(new TagAddAction(tag));
    this.location.back();
  }

  cancel () {
    this.location.back();
  }

}
