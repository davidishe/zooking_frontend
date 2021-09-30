import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAssistant } from 'src/app/shared/models/animals/animal';
import { environment } from 'src/environments/environment';


type Type = IAssistant;


@Injectable({
  providedIn: 'root'
})


export class ItemsLayoutService {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('app-token'),
      'Access-Control-Expose-Headers': '*'
    })
  };

  createItem(item: Type) {
    return this.http.post(this.baseUrl + 'animals/create/', item);
  }

  deleteItem(itemId: number) {
    return this.http.delete(this.baseUrl + 'items/delete/?productId=' + itemId);
  }

  addProductPhoto(product: Type, formData: any) {
    return this.http.post(this.baseUrl + 'items/photo?productId=' + product.id, formData);
  }

  updateProduct(product: Type) {
    return this.http.put(this.baseUrl + 'items/update', product);
  }

}
