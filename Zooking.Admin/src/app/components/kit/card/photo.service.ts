import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAnimal } from 'src/app/shared/models/animals/animal';
import { IShelter } from 'src/app/shared/models/shelters/shelter';
import { environment } from 'src/environments/environment';



type IItem = IAnimal | IShelter;
const apiRoute = 'photo/';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}


  addPhotoToShelter(item: IItem, formData: any) {
    return this.http.post(this.baseUrl + apiRoute + 'shelters?id=' + item.id, formData);
  }


  addPhotoToPet(item: IItem, formData: any) {
    return this.http.post(this.baseUrl + apiRoute + 'pets?id=' + item.id, formData);
  }

}
