export interface Item {
  _id?: string;
  url: string;
  title: string;
  priority: number;
  tags: any[];
  viewedAt?: Date;
  createdAt?: Date;
}

export enum Priority {
  Top = 1,
  Medium = 2,
  Low = 3
}
