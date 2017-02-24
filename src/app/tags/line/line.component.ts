import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit
} from '@angular/core';
import { Tag } from '../tag.model';
import { TagsService } from '../tags.service';

@Component({
  selector: 'rl-tags-line',
  templateUrl: './line.component.html',
  styleUrls: ['./line.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TagsLineComponent implements OnInit {

  @Input() tag: Tag;

  constructor (private service: TagsService) {
  }

  ngOnInit () {
  }

  searchBy (tag): void {
    // TODO: implement search by this tag
    console.log('No implementation for "Search by this tag" yet.');
  }

  remove (tag): void {
    this.service.remove(tag);
  }

}
