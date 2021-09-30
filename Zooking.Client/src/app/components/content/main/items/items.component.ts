import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { IPagination } from 'src/app/shared/models/pagination';
import { IAnimalType } from 'src/app/shared/models/type';
import { ShopParams } from 'src/app/shared/models/shopParams';
import { PageEvent } from '@angular/material/paginator';
import { DecimalPipe } from '@angular/common';
import { RegionsService } from 'src/app/services/products/regions.service';
import { TypesService } from 'src/app/services/products/types.service';
import { SideNavService } from 'src/app/services/side-nav.service';
import { IRegion } from 'src/app/shared/models/region';
import { IAssistant } from 'src/app/shared/models/animals/animal';
import { AssistantsService } from './assistants.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})

export class ItemsComponent implements OnInit, OnDestroy, AfterViewInit {

  @Input() items: IAssistant[];
  types: IAnimalType[];
  regions: IRegion[];

  pageEvent: PageEvent;
  decimalPipe = new DecimalPipe(navigator.language);

  shopParams = new ShopParams();
  totalCount: number;
  sub: Subscription;
  pageSizeOptions = [this.shopParams.pageSize, 10, 15];

  @ViewChild('search', {static: false}) searchTerm: ElementRef;

  constructor(
    private shopService: AssistantsService,
    private typesService: TypesService,
    private regionsService: RegionsService,
    public sideNavService: SideNavService

  ) {
  }



  ngAfterViewInit(): void {
 
  }

  ngOnInit() {

    this.getAllRegions();
    this.getAllTypes();
    this.translateMatPaginator();

  }

  getItems(useCache: boolean) {
    this.sub = this.shopService.getAll().subscribe((response: IPagination) => {
      this.items = response.data;
      this.totalCount = response.count;

    }, error => {
      console.log(error);
    });
  }

  translateMatPaginator() {
  }

  onRegionSelected(regionId: number) {
  }

  onTypeSelected(typeId: number) {
    this.getItems(false);
  }

  onSortSelected(sort: string) {
  }

  onSearch() {

  }

  onReset() {
    this.searchTerm.nativeElement.value = undefined;
    this.searchTerm.nativeElement.value = '';

    const params = new ShopParams();
    params.search = undefined;
    console.log(this.searchTerm.nativeElement.value);
    this.getItems(false);

  }

  getAllTypes() {
    this.sub = this.typesService.GetAllTypes().subscribe((response) => {
      this.types = response;
    }, error => {
      console.log(error);
    });
  }

  getAllRegions() {
    this.sub = this.regionsService.GetAllRegions().subscribe((response) => {
      this.regions = response;
    }, error => {
      console.log(error);
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }



}