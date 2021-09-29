import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IAnimal } from '../shared/models/animals/animal';
import { HttpHeaders, HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class LandingService {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  GetAllProdcutsForLanding() {
    return this.http.get<any>(this.baseUrl + 'landing/get-items/');
  }



}
