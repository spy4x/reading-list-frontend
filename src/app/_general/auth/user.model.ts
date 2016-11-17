export class User {
  public name: string;
  public avatar: string;
  public id: string;

  constructor (id, name, avatar) {
    Object.assign(this, {id, name, avatar});
  }
}
