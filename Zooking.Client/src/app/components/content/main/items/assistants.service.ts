import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAssistant } from 'src/app/shared/models/animals/animal';
import { AssistantPagination } from 'src/app/shared/models/pagination';
import { ShopParams } from 'src/app/shared/models/shopParams';
import { environment } from 'src/environments/environment';


type Type = IAssistant;

@Injectable({
  providedIn: 'root'
})

export class AssistantsService {


  baseUrl = environment.apiUrl;
  apiUrl = 'assistants/';

  constructor(private http: HttpClient) {}

  items: Type[] = [];
  pagination = new AssistantPagination();
  shopParams = new ShopParams();


  deleteItem(id: number) {
    return this.http.delete(this.baseUrl + this.apiUrl + 'delete?id=' + id);
  }

  getAll() {
    return this.http.get(this.baseUrl + this.apiUrl + 'all');
  }

  createItem(formData: Type) {
    return this.http.post(this.baseUrl + this.apiUrl + 'create', formData);
  }

  updateItemShelter(item: Type) {
    return this.http.put(this.baseUrl + this.apiUrl + 'update', item);
  }

  getItemById(id: number) {
    return this.http.get(this.baseUrl + this.apiUrl + '?id=' + id);
  }

}
