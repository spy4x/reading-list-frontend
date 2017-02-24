import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Tag } from '../tag.model';
import { TagsService } from '../tags.service';


@Component({
  selector: 'rl-tags-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class TagsAddComponent implements OnInit {

  constructor (private service: TagsService, private router: Router) {
  }

  ngOnInit () {
  }

  save (data: Tag) {
    this.service.add(data);
    this.router.navigate(['/tags']);
  }

}
