import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit, Input } from '@angular/core';
import { IAnimal } from 'src/app/shared/models/animals/animal';
import { Subscription } from 'rxjs';
import { IPagination } from 'src/app/shared/models/pagination';
import { IAnimalType } from 'src/app/shared/models/type';
import { ShopParams } from 'src/app/shared/models/shopParams';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { DecimalPipe } from '@angular/common';
import { RegionsService } from 'src/app/services/products/regions.service';
import { ShopService } from 'src/app/services/products/shop.service';
import { TypesService } from 'src/app/services/products/types.service';
import { SideNavService } from 'src/app/services/side-nav.service';
import { IShelter } from 'src/app/shared/models/shelters/shelter';
import { IRegion } from 'src/app/shared/models/region';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})

export class ItemsComponent implements OnInit, OnDestroy, AfterViewInit {

  @Input() items: IAnimal[] | IShelter[];
  types: IAnimalType[];
  regions: IRegion[];

  pageEvent: PageEvent;
  decimalPipe = new DecimalPipe(navigator.language);

  shopParams = new ShopParams();
  totalCount: number;
  sub: Subscription;
  pageSizeOptions = [this.shopParams.pageSize, 10, 15];

  @ViewChild('search', {static: false}) searchTerm: ElementRef;
  @ViewChild('paginator', {static: true}) paginator: MatPaginator;


  constructor(
    private shopService: ShopService,
    private typesService: TypesService,
    private regionsService: RegionsService,
    public sideNavService: SideNavService

  ) {
    this.shopParams = shopService.getShopParams();
  }



  ngAfterViewInit(): void {
    if (this.paginator) {
      this.paginator.page.subscribe(() => {
      const shopParams = this.shopService.getShopParams();
      shopParams.pageNumber = this.paginator.pageIndex;
      shopParams.pageSize = this.paginator.pageSize;
      this.shopService.setShopParams(shopParams);
      this.getItems(false);
    });
    }
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
        return `${start} - ${end} из ${this.decimalPipe.transform(length)}`;
      }


    };

    // this.getItems(false);
    this.getAllRegions();
    this.getAllTypes();
    this.translateMatPaginator();

  }

  getItems(useCache: boolean) {
    this.sub = this.shopService.getAll(useCache).subscribe((response: IPagination) => {
      this.items = response.data;
      this.totalCount = response.count;
      this.paginator.pageSize = response.pageSize;
      this.shopParams.pageSize = this.paginator.pageSize;

    }, error => {
      console.log(error);
    });
  }

  translateMatPaginator() {
      this.paginator._intl.itemsPerPageLabel = 'Продуктов на странице ';
  }

  handlePage(e: any) {

    console.log(this.paginator.pageSize);
    this.shopParams.pageNumber = 0;
    this.shopParams.pageSize = this.paginator.pageSize;

    this.shopService.setShopParams(this.shopParams);
    this.getItems(false);
  }

  onRegionSelected(regionId: number) {
    const params = this.shopService.getShopParams();
    if (regionId !== params.regionIdSelected) {
      params.regionIdSelected = regionId;
    } else {
      params.regionIdSelected = 0;
    }
    params.pageNumber = 0;
    this.shopService.setShopParams(params);
    this.getItems(false);
  }

  onTypeSelected(typeId: number) {
    const params = this.shopService.getShopParams();
    if (typeId !== params.typeIdSelected) {
      params.typeIdSelected = typeId;
    } else {
      params.typeIdSelected = 0;
    }
    params.pageNumber = 0;
    this.shopService.setShopParams(params);
    this.getItems(false);
  }

  onSortSelected(sort: string) {
    const params = this.shopService.getShopParams();
    params.sortSelected = sort;
    params.pageNumber = 0;
    this.shopService.setShopParams(params);
    this.getItems(false);
  }

  onSearch() {
    const params = this.shopService.getShopParams();
    params.search = this.searchTerm.nativeElement.value;
    params.pageNumber = 0;
    this.shopService.setShopParams(params);
    this.getItems(false);
  }

  onReset() {
    this.searchTerm.nativeElement.value = undefined;
    this.searchTerm.nativeElement.value = '';

    const params = new ShopParams();
    params.search = undefined;
    this.shopService.setShopParams(params);
    console.log(this.searchTerm.nativeElement.value);
    this.getItems(false);
    this.shopParams = this.shopService.getShopParams();

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