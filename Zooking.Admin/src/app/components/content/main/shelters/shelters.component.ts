import { DecimalPipe } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { RegionsService } from 'src/app/services/products/regions.service';
import { SheltersService } from 'src/app/components/content/main/shelters/shelters.service';
import { TypesService } from 'src/app/services/products/types.service';
import { SideNavService } from 'src/app/services/side-nav.service';
import { IRegion } from 'src/app/shared/models/region';
import { IShelter } from 'src/app/shared/models/shelters/shelter';
import { ShopParams } from 'src/app/shared/models/shopParams';
import { IPagination } from 'src/app/shared/models/pagination';

@Component({
  selector: 'app-shelters',
  templateUrl: './shelters.component.html',
  styleUrls: ['./shelters.component.scss']
})
export class SheltersComponent {

  shelters: IShelter[];
  regions: IRegion[];
  // types: IShelterType[];

  pageEvent: PageEvent;
  decimalPipe = new DecimalPipe(navigator.language);

  shopParams = new ShopParams();
  totalCount: number;
  sub: Subscription;
  pageSizeOptions = [this.shopParams.pageSize, 10, 15];

  @ViewChild('paginator', {static: true}) paginator?: MatPaginator;
  @ViewChild('search', {static: false}) searchTerm: ElementRef;


  constructor(
    public sheltersService: SheltersService,
    public sideNavService: SideNavService,
    private typesService: TypesService,
    private regionsService: RegionsService,

  ) {
    this.shopParams = sheltersService.getShopParams();
  }


  ngOnInit() {
    this.paginator._intl.getRangeLabel = (page: number, pageSize: number, length: number) => {
      if (page > 0) {
        const start = (page) * pageSize;
        const end = (page + 1) * pageSize;
        return `${start} - ${end} из ${this.decimalPipe.transform(length)}`;
      }

      if (page === 0) {
        const start = 1;
        const end = (page + 1) * pageSize;
        // return `${start} - ${end} из ${this.decimalPipe.transform(length)}`;
        return `${start} - ${end} из ${this.decimalPipe.transform(length)}`;
      }


    };

    this.translateMatPaginator();

    this.getAllRegions();
    this.getItems(false);
  }

  translateMatPaginator() {
      this.paginator._intl.itemsPerPageLabel = 'Записей на странице ';
  }

  getAllRegions() {
    this.sub = this.regionsService.GetAllRegions().subscribe((response) => {
      this.regions = response;
    }, error => {
      console.log(error);
    });
  }

  getItems(useCache: boolean) {
    this.sub = this.sheltersService.getAll(useCache).subscribe((response: IPagination) => {
      this.shelters = response.data;
      this.totalCount = response.count;
      this.paginator.pageSize = response.pageSize;
      this.shopParams.pageSize = this.paginator.pageSize;

    }, error => {
      console.log(error);
    });
  }



  onTypeSelected(typeId: number) {
    const params = this.sheltersService.getShopParams();
    if (typeId !== params.typeIdSelected) {
      params.typeIdSelected = typeId;
    } else {
      params.typeIdSelected = 0;
    }
    params.pageNumber = 0;
    this.sheltersService.setShopParams(params);
    this.getItems(false);
  }

  onSortSelected(sort: string) {
    const params = this.sheltersService.getShopParams();
    params.sortSelected = sort;
    params.pageNumber = 0;
    this.sheltersService.setShopParams(params);
    this.getItems(false);
  }

  onSearch() {
    const params = this.sheltersService.getShopParams();
    params.search = this.searchTerm.nativeElement.value;
    params.pageNumber = 0;
    this.sheltersService.setShopParams(params);
    this.getItems(false);
  }

  onRegionSelected(regionId: number) {
    const params = this.sheltersService.getShopParams();
    if (regionId !== params.regionIdSelected) {
      params.regionIdSelected = regionId;
    } else {
      params.regionIdSelected = 0;
    }
    params.pageNumber = 0;
    this.sheltersService.setShopParams(params);
    this.getItems(false);
  }

  onReset() {
    this.searchTerm.nativeElement.value = undefined;
    this.searchTerm.nativeElement.value = '';

    const params = new ShopParams();
    params.search = undefined;
    this.sheltersService.setShopParams(params);
    console.log(this.searchTerm.nativeElement.value);
    this.getItems(false);
    this.shopParams = this.sheltersService.getShopParams();
  }

  

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngAfterViewInit(): void {
    if (this.paginator) {
      this.paginator.page.subscribe(() => {
      const shopParams = this.sheltersService.getShopParams();
      shopParams.pageNumber = this.paginator.pageIndex;
      shopParams.pageSize = this.paginator.pageSize;
      this.sheltersService.setShopParams(shopParams);
      this.getItems(false);
    });
    }
  }














}
