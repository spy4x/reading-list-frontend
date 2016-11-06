export class Item {

  public url: string;
  public title: string;
  public priority: number = 1;
  public type: string = 'article';
  public keywords: string;
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
