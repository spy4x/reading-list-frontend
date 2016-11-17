import { User } from '../_general/auth/user.model';
export class Item {

  public _id: string;
  public url: string;
  public title: string;
  public priority: number = 1;
  public tags: string;
  public readonly owner: User;
  private _viewed: boolean;
  private _viewedAt: Date;

  constructor (data) {
    Object.assign(this, data);
  }


  get viewed (): boolean {
    return this._viewed;
  }

  set viewed (value: boolean) {
    this._viewed = value;
    this._viewedAt = value ? new Date() : null;
  }

  get viewedAt (): Date {
    return this._viewedAt;
  }

}
