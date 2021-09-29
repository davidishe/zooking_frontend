import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { IAnimal, IAnimalToCreate } from 'src/app/shared/models/animals/animal';
import { AnimalsPagination } from 'src/app/shared/models/pagination';
import { ShopParams } from 'src/app/shared/models/shopParams';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PetsService {

  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}
  pets: IAnimal[] = [];
  pagination = new AnimalsPagination();
  shopParams = new ShopParams();

  httpOptions = {
    headers: new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('app-token'),
      'Access-Control-Expose-Headers': '*'
    })
  };


  addProductPhoto(product: IAnimal, formData: any) {
    return this.http.post(this.baseUrl + 'items/photo?productId=' + product.id, formData);
  }

  getAll(useCache?: boolean) {

    this.getShopParams();

    // if nocache scenaro used delete products from this.pets
    if (useCache === false) {
      this.pets = [];
    }

    // check if cache scenario is activated
    if (useCache === true && this.pets.length > 0) {

      const pageReceived = Math.ceil(this.pets.length / this.shopParams.pageSize);

      if (this.shopParams.pageNumber < pageReceived) {

        if (this.shopParams.pageNumber === 0) {
          this.pagination.data =
            this.pets.slice(this.shopParams.pageNumber, this.shopParams.pageSize);
        } else {
          this.pagination.data =
            this.pets.slice((this.shopParams.pageNumber * this.shopParams.pageSize),
              (this.shopParams.pageNumber * this.shopParams.pageSize) + this.shopParams.pageSize);
        }

        return of(this.pagination);
      }
    }

    // if nocache scenaro used user params in query
    const params = this.calculateParams();

    return this.http.get<AnimalsPagination>(this.baseUrl + 'animals/all', {observe: 'response', params})
      .pipe(
        map(response => {
          this.pets = [...this.pets, ...response.body.data];
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
