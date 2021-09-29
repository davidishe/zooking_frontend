import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IAnimalType } from 'src/app/shared/models/type';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()

export class TypesService {

  baseUrl = environment.apiUrl;
  types: IAnimalType[] = [];



  constructor(private http: HttpClient) { }

  GetAllTypes() {
    if (this.types.length > 0) {
      return of(this.types);
    }
    return this.http.get<IAnimalType[]>(this.baseUrl + 'animals/types').pipe(
      map(response => {
        this.types = response;
        return this.types;
      })
    );
  }

  Create(productType: IAnimalType) {
    return this.http.post(this.baseUrl + 'animals/create-type', productType);
  }

  GetById(id: number) {
    return this.http.get(this.baseUrl + 'get-item/?id=' + id);
  }

  Update(productType: IAnimalType) {
    return this.http.post(this.baseUrl + 'update-item', productType);
  }

  Delete(id: number) {
    return this.http.delete(this.baseUrl + 'delete-item/?id=' + id);
  }


}
