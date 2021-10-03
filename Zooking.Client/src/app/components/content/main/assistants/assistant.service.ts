import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenericService } from 'src/app/services/generic.service';
import { IAssistant } from 'src/app/shared/models/animals/assistant';

@Injectable({
  providedIn: 'root'
})

export class AssistantService extends GenericService<IAssistant> {
  constructor(http: HttpClient) {
    super(http, 'assistants/');
  }
}