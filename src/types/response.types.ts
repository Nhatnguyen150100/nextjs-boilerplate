export interface IBaseResponse<T> {
  data?: T;
  message: string;
  timestamp: string;
  statusCode: number;
}

export interface IBaseResponsePage<T> {
  content: T;
  metaData: IMetadata;
}

export interface IMetadata {
  page: number;
  totalItem: number;
  totalPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}
