import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { IAnimal, IAnimalToCreate } from 'src/app/shared/models/animals/animal';
import { AnimalsPagination, SheltersPagination } from 'src/app/shared/models/pagination';
import { IShelter, IShelterToCreate } from 'src/app/shared/models/shelters/shelter';
import { ShopParams } from 'src/app/shared/models/shopParams';
import { environment } from 'src/environments/environment';

type IItem = IShelterToCreate;
const apiRoute = 'shelters/';

@Injectable({
  providedIn: 'root'
})
export class SheltersService {

  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}
  shelters: IShelter[] = [];
  pagination = new SheltersPagination();
  shopParams = new ShopParams();

  httpOptions = {
    headers: new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('app-token'),
      'Access-Control-Expose-Headers': '*'
    })
  };

  createItem(item: IItem) {
    return this.http.post(this.baseUrl + apiRoute + 'create/', item);
  }

  deleteItem(itemId: number) {
    return this.http.delete(this.baseUrl + apiRoute + 'delete/?id=' + itemId);
  }

  updateItem(item: IItem) {
    return this.http.put(this.baseUrl + apiRoute + 'update', item);
  }

  addItemPhoto(product: IItem, formData: any) {
    return this.http.post(this.baseUrl + apiRoute + 'photo?id=' + product.id, formData);
  }

  getItemById(id: number) {
    return this.http.get(this.baseUrl + apiRoute + 'getbyid/?id=' + id);
  }


  getAll(useCache?: boolean) {

    this.getShopParams();

    // if nocache scenaro used delete products from this.shelters
    if (useCache === false) {
      this.shelters = [];
    }

    // check if cache scenario is activated
    if (useCache === true && this.shelters.length > 0) {

      const pageReceived = Math.ceil(this.shelters.length / this.shopParams.pageSize);

      if (this.shopParams.pageNumber < pageReceived) {

        if (this.shopParams.pageNumber === 0) {
          this.pagination.data =
            this.shelters.slice(this.shopParams.pageNumber, this.shopParams.pageSize);
        } else {
          this.pagination.data =
            this.shelters.slice((this.shopParams.pageNumber * this.shopParams.pageSize),
              (this.shopParams.pageNumber * this.shopParams.pageSize) + this.shopParams.pageSize);
        }

        return of(this.pagination);
      }
    }

    // if nocache scenaro used user params in query
    const params = this.calculateParams();

    return this.http.get<SheltersPagination>(this.baseUrl + 'shelters/all', {observe: 'response', params})
      .pipe(
        map(response => {
          // this.shelters = [...this.shelters, ...response.body.data];
          this.shelters = [...this.shelters, ...response.body.data];
          this.pagination = response.body;
          return this.pagination;
        })
      );

  }

  getShopParams() {
    return this.shopParams;
  }

  setShopParams(params: ShopParams) {
    this.shopParams = params;
  }

  calculateParams(): HttpParams {
    let params = new HttpParams();

    if (this.shopParams.regionIdSelected !== 0) {
      params = params.append('regionId', this.shopParams.regionIdSelected.toString());
    }
    if (this.shopParams.typeIdSelected !== 0) {
      params = params.append('typeId', this.shopParams.typeIdSelected.toString());
    }
    if (this.shopParams.search) {
      params = params.append('search', this.shopParams.search);
    }

    params = params.append('sort', this.shopParams.sortSelected);
    params = params.append('pageIndex', (this.shopParams.pageNumber).toString());
    params = params.append('pageSize', this.shopParams.pageSize.toString());
    return params;
  }

}
