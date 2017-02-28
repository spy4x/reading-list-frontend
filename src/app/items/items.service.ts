import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../environments/environment';
import { Item } from './item.model';
import { AuthHttp } from 'angular2-jwt';
import { Response } from '@angular/http';

@Injectable()
export class ItemsService {
  private urlPath = 'items';

  constructor (private http: AuthHttp) {
  }

  add (item: {url, title, priority, tags}): Observable<Item> {
    return this.http
      .post(environment.apiUrl + this.urlPath,
        JSON.stringify(item))
      .map(res => res.json());
  }

  update (itemToUpdate: Item, changes: any): Observable<Item> {
    const clone = {};
    Object.assign(clone, itemToUpdate, changes);
    return this.http
      .put(`${environment.apiUrl}${this.urlPath}/${itemToUpdate._id}`,
        JSON.stringify(clone))
      .map(res => res.json());
  }

  remove (itemToRemove: Item): Observable<Response> {
    return this.http
      .delete(`${environment.apiUrl}${this.urlPath}/${itemToRemove._id}`);
  }

  loadItems (): Observable<Item[]> {
    return this.http
      .get(environment.apiUrl + this.urlPath)
      .map(res => res.json());
  }

}
