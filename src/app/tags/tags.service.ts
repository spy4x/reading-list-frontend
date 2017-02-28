import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../environments/environment';
import { Tag } from './tag.model';
import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class TagsService {
  private urlPath = 'tags';

  constructor (private http: AuthHttp) {
  }

  add (tag: {name}): Observable<Tag> {
    return this.http
      .post(environment.apiUrl + this.urlPath,
        JSON.stringify(tag))
      .map(res => res.json());
  }

  update (tagToUpdate: Tag, changes: any): Observable<Tag> {
    const clone = {};
    Object.assign(clone, tagToUpdate, changes);
    return this.http
      .put(`${environment.apiUrl}${this.urlPath}/${tagToUpdate._id}`,
        JSON.stringify(clone))
      .map(res => res.json());
  }

  remove (tagToRemove: Tag): Observable<Response> {
    return this.http
      .delete(`${environment.apiUrl}${this.urlPath}/${tagToRemove._id}`);
  }

  loadTags (): Observable<Tag[]> {
    return this.http
      .get(environment.apiUrl + this.urlPath)
      .map(res => res.json());
  }
}
