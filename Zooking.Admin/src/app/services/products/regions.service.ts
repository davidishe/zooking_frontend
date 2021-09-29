import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { of } from 'rxjs';
import { IRegion } from 'src/app/shared/models/region';

@Injectable()

export class RegionsService {


  baseUrl = environment.apiUrl;
  regions: IRegion[] = [];

  constructor(private http: HttpClient) { }

  GetAllRegions() {
    if (this.regions.length > 0) {
      return of(this.regions);
    }
    return this.http.get<any>(this.baseUrl + 'regions/regions').pipe(
      map(response => {
        this.regions = response;
        return response;
      })
    );
  }

  Create(productRegion: IRegion) {
    return this.http.post(this.baseUrl + 'animals/create-region', productRegion);
  }

  GetById(id: number) {
    return this.http.get(this.baseUrl + 'get-item/?id=' + id);
  }

  Update(productRegion: IRegion) {
    return this.http.post(this.baseUrl + 'update-item', productRegion);
  }

  Delete(id: number) {
    return this.http.delete(this.baseUrl + 'delete-item/?id=' + id);
  }

}
