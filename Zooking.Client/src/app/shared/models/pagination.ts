import { IAssistant } from './animals/animal';
import { IShelter } from './shelters/shelter';

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





