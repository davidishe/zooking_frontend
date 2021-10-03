import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { IAssistantType } from 'src/app/shared/models/type';


type Type = IAssistantType;


@Injectable()

export class TypesService {

  baseUrl = environment.apiUrl;
  apiUrl = 'types/';
  types: Type[] = [];



  constructor(private http: HttpClient) { }

  GetAllTypes() {
    if (this.types.length > 0) {
      return of(this.types);
    }
    return this.http.get<Type[]>(this.baseUrl + this.apiUrl + 'all').pipe(
      map(response => {
        this.types = response;
        return this.types;
      })
    );
  }

  Create(item: Type) {
    return this.http.post(this.baseUrl + this.apiUrl + 'create', item);
  }

  GetById(id: number) {
    return this.http.get(this.baseUrl + 'getbyid?id=' + id);
  }

  Update(item: Type) {
    return this.http.post(this.baseUrl + 'update', item);
  }

  Delete(id: number) {
    return this.http.delete(this.baseUrl + 'delete?id=' + id);
  }


}
