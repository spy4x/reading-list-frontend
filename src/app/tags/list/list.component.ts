import { Component, OnInit } from '@angular/core';
import { Tag } from '../tag.model';
import { TagsService } from '../tags.service';

@Component({
  selector: 'rl-tags-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class TagsListComponent implements OnInit {

  tags: Tag[];

  constructor (private service: TagsService) {
  }

  ngOnInit () {
    this.service.tags.subscribe(tags => this.tags = tags);
  }

}
