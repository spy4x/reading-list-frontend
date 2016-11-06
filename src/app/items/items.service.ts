import { Injectable } from '@angular/core';

import { Item } from './item.model';

@Injectable()
export class ItemsService {
  public items: Item[] = new Array<Item>();

  constructor () {
    this.items.push(new Item({
      url: 'http://blog.angular-university.io/how-to-build-angular2-apps-using-rxjs-observable-data-services-pitfalls-to-avoid/',
      title: 'How to build Angular 2 apps using Observable Data Services - Pitfalls to avoid',
      priority: 1,
      type: 'guide',
      keywords: 'angular,rxjs'
    }));
    this.items.push(new Item({
      url: 'https://www.toptal.com/api-developers/social-network-apis',
      title: 'Social networks APIs',
      priority: 3,
      type: 'article',
      keywords: 'external-apis'
    }));
    this.items.push(new Item({
      url: 'https://www.youtube.com/watch?v=e6DUrH56g14',
      title: 'HTTPS vs HTTP',
      priority: 2,
      type: 'video',
      keywords: 'security'
    }));
  }

  add (item: {url, title, priority, type, keywords}): void {
    this.items.push(new Item(item));
  }

  update (item: Item, changes: any): void {
    Object.assign(item, changes);
  }

  remove (item: Item): void {
    this.items.splice(this.items.indexOf(item), 1);
  }

}
