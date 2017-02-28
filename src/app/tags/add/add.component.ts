import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Tag } from '../tag.model';
import { State } from '../../_general/store/app.state';
import { TagAddAction } from '../../_general/store/tags/tagAdd.action';


@Component({
  selector: 'rl-tags-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class TagsAddComponent implements OnInit {

  constructor (private store: Store<State>, private router: Router) {
  }

  ngOnInit () {
  }

  save (tag: Tag) {
    this.store.dispatch(new TagAddAction(tag));
    this.router.navigate(['/tags']);
  }

}
