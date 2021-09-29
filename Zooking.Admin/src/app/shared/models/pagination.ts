import { IAnimal } from './animals/animal';
import { IShelter } from './shelters/shelter';

export interface IPagination {
  pageIndex: number;
  pageSize: number;
  count: number;
  data: IAnimal[] | IShelter[];
}

export class PaginatedResult<T> {
  result2: T;
  pagination2: IPagination;
}

export class SheltersPagination implements IPagination {
  pageIndex: number;
  pageSize: number;
  count: number;
  data: IShelter[];
}

export class AnimalsPagination implements IPagination {
  pageIndex: number;
  pageSize: number;
  count: number;
  data: IAnimal[];
}



