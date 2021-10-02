import { DecimalPipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { RegionsService } from 'src/app/services/products/regions.service';
import { TypesService } from 'src/app/services/products/types.service';
import { IAssistant } from 'src/app/shared/models/animals/assistant';
import { IPagination } from 'src/app/shared/models/pagination';
import { IRegion } from 'src/app/shared/models/region';
import { ShopParams } from 'src/app/shared/models/shopParams';
import { IAnimalType } from 'src/app/shared/models/type';
import { AssistantsService } from '../items/assistants.service';

@Component({
  selector: 'app-pets',
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.scss']
})
export class PetsComponent implements OnInit {

  sub: Subscription;
  types: IAnimalType[];
  regions: IRegion[];
  pets: IAssistant[];
  totalCount: number;
  shopParams = new ShopParams();
  decimalPipe = new DecimalPipe(navigator.language);


  pageSizeOptions = [this.shopParams.pageSize, 10, 15];
  @ViewChild('search', {static: false}) searchTerm: ElementRef;


  constructor(
    private typesService: TypesService,
    private regionsService: RegionsService,
    private petsService: AssistantsService
  ) {
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
    this.sub = this.petsService.getAll().subscribe((response: IAssistant[]) => {
      this.pets = response;
    }, error => {
      console.log(error);
    });
  }




  onTypeSelected(typeId: number) {

  }

  onSortSelected(sort: string) {

  }

  onSearch() {

  }

  onReset() {

  }



  ngAfterViewInit(): void {


  }

  onRegionSelected(regionId: number) {

  }



  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
