import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


// export abstract class AbstractRestService<T> {
//   constructor(protected http: Http, protected actionUrl:string){
//   }

//   getAll():Observable<T[]> {
//     return this.http.get(this.actionUrl).map(resp=>resp.json() as T[]);
//   }

//   getOne(id:number):Observable<T> {
//     return this.http.get(`${this.actionUrl}${id}`).map(resp=>resp.json() as T);
//   }

// } 

// @Injectable({
//   providedIn: 'root'
// })

export abstract class GenericService<T> {

  
  baseUrl = environment.apiUrl;
  types: T[] = [];


  constructor(
    protected http: HttpClient,
    protected actionUrl: string) {
  }

  // GetAll() {
  //   if (this.types.length > 0) {
  //     return of(this.types);
  //   }
  //   return this.http.get<T[]>(this.baseUrl + this.actionUrl + 'all').pipe(
  //     map(response => {
  //       this.types = response;
  //       return this.types;
  //     })
  //   );
  // }


  getAll(): Observable<T[]> {
    return this.http.get(this.baseUrl + this.actionUrl + 'all').pipe(map(resp => resp as T[]));
  }

  getOne(id: number): Observable<T> {
    return this.http.get(`${this.actionUrl}${id}`).pipe(map(resp => resp as T));
  }

  Create(item: T) {
    return this.http.post(this.baseUrl + this.actionUrl + 'create', item);
  }

  GetById(id: number) {
    return this.http.get(this.baseUrl + 'getbyid?id=' + id);
  }

  Update(item: T) {
    return this.http.post(this.baseUrl + 'update', item);
  }

  Delete(id: number) {
    return this.http.delete(this.baseUrl + 'delete?id=' + id);
  }

}
