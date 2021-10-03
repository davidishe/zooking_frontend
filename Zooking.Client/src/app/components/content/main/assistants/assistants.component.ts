import { DecimalPipe } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { RegionsService } from 'src/app/services/products/regions.service';
import { TypesService } from 'src/app/services/products/types.service';
import { IAssistant } from 'src/app/shared/models/animals/assistant';
import { IPagination } from 'src/app/shared/models/pagination';
import { IRegion } from 'src/app/shared/models/region';
import { AssistantParams } from 'src/app/shared/models/shopParams';
import { IAssistantType } from 'src/app/shared/models/type';
import { AssistantService } from './assistant.service';
import { ParamsService } from './params.service';

@Component({
  selector: 'app-assistants',
  templateUrl: './assistants.component.html',
  styleUrls: ['./assistants.component.scss']
})


export class AssistantsComponent implements OnInit {

  sub: Subscription;
  types: IAssistantType[];
  regions: IRegion[];
  assistants: IAssistant[];
  assistantsParams = new AssistantParams();
  decimalPipe = new DecimalPipe(navigator.language);


  @ViewChild('search', {static: false}) searchTerm: ElementRef;


  constructor(
    private typesService: TypesService,
    private regionsService: RegionsService,
    private paramsService: ParamsService,
    private assistantService: AssistantService,
  private cdr: ChangeDetectorRef

  ) {
    this.assistantsParams = paramsService.getShopParams();
  }

  ngOnInit() {
    this.getAllItems();
    this.getAllTypes();
    this.getAllRegions();
  }



  getAllRegions() {
    this.sub = this.regionsService.GetAllRegions().subscribe((response) => {
      this.regions = response;
    }, error => {
      console.log(error);
    });
  }


  getAllTypes() {
    this.sub = this.typesService.GetAllTypes().subscribe((response) => {
      this.types = response;
    }, error => {
      console.log(error);
    });
  }

  getAllItems() {
    this.sub = this.assistantService.getAll().subscribe((response: IAssistant[]) => {
      this.assistants = response;
    }, error => {
      console.log(error);
    });
  }


  onTypeSelected(typeId: number) {
    const params = this.paramsService.getShopParams();
    if (typeId !== params.typeIdSelected) {
      params.typeIdSelected = typeId;
    } else {
      params.typeIdSelected = 0;
    }
    params.pageNumber = 0;
    this.paramsService.setShopParams(params);
    this.getAllItems();
  }

  onSortSelected(sort: string) {

  }

  onSearch() {

  }

  onReset() {

  }



  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

  onRegionSelected(regionId: number) {

  }


  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
