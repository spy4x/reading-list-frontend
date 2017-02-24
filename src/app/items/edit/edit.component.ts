import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Item } from '../item.model';
import { ItemsService } from '../items.service';

@Component({
  selector: 'rl-items-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class ItemsEditComponent implements OnInit, OnDestroy {
  itemId: string;
  item: Item;
  private routeParamsSub: Subscription;
  private serviceItemSub: Subscription;

  constructor (private service: ItemsService,
               private router: Router,
               private route: ActivatedRoute) {
  }

  ngOnInit () {
    this.routeParamsSub = this.route.params.subscribe(params => {
      this.itemId = params['id'];
      this.item = this.getItem(this.service.items.value, this.itemId);
    });
    this.serviceItemSub = this.service.items.subscribe(items => {
      this.item = this.getItem(items, this.itemId);
    });
  }

  ngOnDestroy () {
    this.routeParamsSub.unsubscribe();
    this.serviceItemSub.unsubscribe();
  }

  getItem (items: Item[], itemId: string): Item | undefined {
    if (!items) {
      return undefined;
    }
    return items.find(item => {
      return item._id === itemId;
    });
  }

  save (data) {
    this.service.update(this.item, data);
    this.router.navigate(['/']);
  }

  cancel () {
    this.router.navigate(['/']);
  }

}
