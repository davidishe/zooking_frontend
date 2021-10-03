import { Injectable } from '@angular/core';
import { AssistantParams } from 'src/app/shared/models/shopParams';

@Injectable({
  providedIn: 'root'
})
export class ParamsService {

  params = new AssistantParams();

  constructor() { }

  setShopParams(params: AssistantParams) {
    this.params = params;
  }

  getShopParams() {
    return this.params;
  }


}
