import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Tag } from '../tag.model';
import { TagsService } from '../tags.service';

@Component({
  selector: 'rl-tags-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class TagsEditComponent implements OnInit, OnDestroy {
  tagId: string;
  tag: Tag;
  private routeParamsSub: Subscription;
  private serviceTagSub: Subscription;

  constructor (private service: TagsService,
               private router: Router,
               private route: ActivatedRoute) {
  }

  ngOnInit () {
    this.routeParamsSub = this.route.params.subscribe(params => {
      this.tagId = params['id'];
      this.tag = this.getTag(this.service.tags.value, this.tagId);
    });
    this.serviceTagSub = this.service.tags.subscribe(tags => {
      this.tag = this.getTag(tags, this.tagId);
    });
  }

  ngOnDestroy () {
    this.routeParamsSub.unsubscribe();
    this.serviceTagSub.unsubscribe();
  }

  getTag (tags: Tag[], tagId: string): Tag | undefined {
    if (!tags) {
      return undefined;
    }
    return tags.find(tag => {
      return tag._id === tagId;
    });
  }

  save (data: Tag): void {
    this.service.update(this.tag, data);
    this.router.navigate(['/tags']);
  }

  cancel (): void {
    this.router.navigate(['/tags']);
  }

}
