import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { BehaviorSubject } from 'rxjs/Rx';
import { environment } from '../../environments/environment';
import { AuthService } from '../_general/auth/auth.service';
import { Tag } from './tag.model';

@Injectable()
export class TagsService {
  public tags: BehaviorSubject<Tag[]> = new BehaviorSubject<Tag[]>([]);
  private urlPath = 'tags';

  constructor (private http: Http, private auth: AuthService) {
    this.loadTags();
  }

  add (tag: {name}): void {
    this
      .http
      .post(environment.apiUrl + this.urlPath,
        JSON.stringify(tag),
        this.auth.getRequestOptions())
      .subscribe((res: Response) => {
        if (res.ok) {
          this.tags.next([...this.tags.value, res.json()]);
        }
      });
  }

  update (tagToUpdate: Tag, changes: any): void {
    const clone = {};
    Object.assign(clone, tagToUpdate, changes);
    this
      .http
      .put(`${environment.apiUrl}${this.urlPath}/${tagToUpdate._id}`,
        JSON.stringify(clone), this.auth.getRequestOptions())
      .subscribe((res: Response) => {
        if (res.ok) {
          const updateTagJson = res.json();
          this.tags.next(this.tags.value.map(tag => {
            if (tag._id === tagToUpdate._id) {
              return updateTagJson;
            }
            return tag;
          }));
        }
      });
  }

  remove (tagToRemove: Tag): void {
    this.http
      .delete(`${environment.apiUrl}${this.urlPath}/${tagToRemove._id}`,
        this.auth.getRequestOptions())
      .subscribe((res: Response) => {
        if (res.ok) {
          this.tags.next(
            this.tags.value.filter(tag => tag._id !== tagToRemove._id));
        }
      });
  }

  // Private methods

  private loadTags (): void {
    this.auth.user.subscribe(user => {
      if (user) {
        this.http
          .get(environment.apiUrl + this.urlPath,
            this.auth.getRequestOptions())
          .subscribe((res: Response) => {
            if (res.ok) {
              this.tags.next(res.json());
            }
          });
      } else {
        this.tags.next([]);
      }
    });
  }
}
