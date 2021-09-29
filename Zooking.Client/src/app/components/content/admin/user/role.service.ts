import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IAnimalToCreate, IAnimal } from 'src/app/shared/models/animals/animal';
import { IUser } from 'src/app/shared/models/user/user';
import { IRoles } from 'src/app/shared/models/user/userRoles';
import { environment } from 'src/environments/environment';


const apiRoute = "role/";

@Injectable({
  providedIn: 'root'
})

export class RoleService {

  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('app-token'),
      'Access-Control-Expose-Headers': '*'
    })
  };

  changeUserRoles(userId: number, roles: IRoles) {
    return this.http.post(this.baseUrl + apiRoute + 'change?userId=' + userId, roles);
  }

  addRoleForCurrentUser(role: string) {
    return this.http.post(this.baseUrl + apiRoute + 'add?role=' + role, null);
  }

  deleteRoleForCurrentUser(role: string) {
    return this.http.delete(this.baseUrl + apiRoute + 'delete?role=' + role);
  }

  




}
