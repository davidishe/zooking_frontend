import { IAssistant } from './animals/assistant';

export interface IPagination {
  pageIndex: number;
  pageSize: number;
  count: number;
  data: IAssistant[];
}

export class PaginatedResult<T> {
  result2: T;
  pagination2: IPagination;
}

export class AssistantPagination implements IPagination {
  pageIndex: number;
  pageSize: number;
  count: number;
  data: IAssistant[];
}





