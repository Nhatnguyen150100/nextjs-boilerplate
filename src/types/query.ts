export enum ESortOrder {
  ASC = 'asc',
  DESC = 'desc',
}

export interface IQuery {
  page?: number;
  limit?: number;
  sort?: ESortOrder;
  search?: string;
  [key: string]: any;
}
