import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Item } from './item.model';
import { environment } from '../../environments/environment';
import { AuthService } from '../_general/auth/auth.service';
import { BehaviorSubject, Subject } from 'rxjs/Rx';

@Injectable()
export class ItemsService {
  private _items: Item[];
  public items: Subject<Item[]> = new BehaviorSubject<Item[]>(null);
  private urlPath = 'items';

  constructor (private _http: Http, private _auth: AuthService) {
    this._loadItems();
  }

  add (item: {url, title, priority, tags}): void {
    this
      ._http
      .post(environment.apiUrl + this.urlPath, JSON.stringify(item), this._auth.getRequestOptions())
      .subscribe((res: Response) => {
        this._items.push(new Item(res.json()));
      });
  }

  update (item: Item, changes: any): void {
    this
      ._http
      .put(`${environment.apiUrl}${this.urlPath}/${item._id}`, JSON.stringify(changes), this._auth.getRequestOptions())
      .subscribe((res: Response) => {
        if (res.ok) {
          Object.assign(item, changes);
        }
      });
  }

  remove (item: Item): void {
    this._http
      .delete(`${environment.apiUrl}${this.urlPath}/${item._id}`, this._auth.getRequestOptions())
      .subscribe((res: Response) => {
        if (res.ok) {
          this._items.splice(this._items.indexOf(item), 1);
        }
      });
  }

  // Private methods

  private _loadItems (): void {
    this._auth.user.subscribe(user => {
      if (user) {
        this._http
          .get(environment.apiUrl + this.urlPath, this._auth.getRequestOptions())
          .subscribe((res: Response) => {
            this._items = new Array<Item>();
            let items = res.json();
            for (let item of items) {
              this._items.push(new Item(item));
            }
            this.items.next(this._items);
          });
      } else {
        this._items = new Array<Item>();
        this.items.next(this._items);
      }
    });
  }

}
