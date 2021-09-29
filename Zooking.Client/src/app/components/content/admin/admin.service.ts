import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams, HttpEventType } from '@angular/common/http';
import { IAnimal, IAnimalToCreate } from 'src/app/shared/models/animals/animal';
import { PaginatedResult } from 'src/app/shared/models/pagination';
import { IUser } from 'src/app/shared/models/user/user';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})


export class AdminService {

  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('app-token'),
      'Access-Control-Expose-Headers': '*'
    })
  };

  createProduct(product: IAnimalToCreate) {
    return this.http.post(this.baseUrl + 'products/create/', product);
  }

  deleteProduct(productId: number) {
    return this.http.delete(this.baseUrl + 'products/delete/?productId=' + productId);
  }

  addProductPhoto(product: IAnimal, formData: any) {
    return this.http.post(this.baseUrl + 'products/photo?productId=' + product.id, formData);
  }

  updateProduct(product: IAnimalToCreate) {
    return this.http.put(this.baseUrl + 'products/update', product);
  }

  setProductIsSale(productId: string) {
    return this.http.patch(this.baseUrl + 'products/sale?productId=' + productId, null);
  }

  getUsers() {
    return this.http.get<IUser[]>(this.baseUrl + 'admin/users/all')
      .pipe(
        map(response => {
        return response;
      }),
    );
  }

  getUser(id: number): Observable<IUser> {
    return this.http.get<IUser>(this.baseUrl + 'users/' + id, this.httpOptions);
  }
}
