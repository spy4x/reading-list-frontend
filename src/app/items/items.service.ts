import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { BehaviorSubject } from 'rxjs/Rx';
import { environment } from '../../environments/environment';
import { AuthService } from '../_general/auth/auth.service';
import { Item } from './item.model';

@Injectable()
export class ItemsService {
  public items: BehaviorSubject<Item[]> = new BehaviorSubject<Item[]>([]);
  private urlPath = 'items';

  constructor (private http: Http, private auth: AuthService) {
    this.loadItems();
  }

  add (item: {url, title, priority, tags}): void {
    this
      .http
      .post(environment.apiUrl + this.urlPath,
        JSON.stringify(item),
        this.auth.getRequestOptions())
      .subscribe((res: Response) => {
        if (res.ok) {
          this.items.next([...this.items.value, res.json()]);
        }
      });
  }

  update (itemToUpdate: Item, changes: any): void {
    const clone = {};
    Object.assign(clone, itemToUpdate, changes);
    this
      .http
      .put(`${environment.apiUrl}${this.urlPath}/${itemToUpdate._id}`,
        JSON.stringify(clone), this.auth.getRequestOptions())
      .subscribe((res: Response) => {
        if (res.ok) {
          const updateItemJson = res.json();
          this.items.next(this.items.value.map(item => {
            if (item._id === itemToUpdate._id) {
              return updateItemJson;
            }
            return item;
          }));
        }
      });
  }

  remove (itemToRemove: Item): void {
    this.http
      .delete(`${environment.apiUrl}${this.urlPath}/${itemToRemove._id}`,
        this.auth.getRequestOptions())
      .subscribe((res: Response) => {
        if (res.ok) {
          this.items.next(
            this.items.value.filter(item => item._id !== itemToRemove._id));
        }
      });
  }

  // Private methods

  private loadItems (): void {
    this.auth.user.subscribe(user => {
      if (user) {
        this.http
          .get(environment.apiUrl + this.urlPath,
            this.auth.getRequestOptions())
          .subscribe((res: Response) => {
            if (res.ok) {
              this.items.next(res.json());
            }
          });
      } else {
        this.items.next([]);
      }
    });
  }

}
