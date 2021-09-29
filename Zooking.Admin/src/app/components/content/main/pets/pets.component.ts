import { DecimalPipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { RegionsService } from 'src/app/services/products/regions.service';
import { TypesService } from 'src/app/services/products/types.service';
import { IAnimal } from 'src/app/shared/models/animals/animal';
import { IPagination } from 'src/app/shared/models/pagination';
import { IRegion } from 'src/app/shared/models/region';
import { IShelter } from 'src/app/shared/models/shelters/shelter';
import { ShopParams } from 'src/app/shared/models/shopParams';
import { IAnimalType } from 'src/app/shared/models/type';
import { PetsService } from './pets.service';

@Component({
  selector: 'app-pets',
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.scss']
})
export class PetsComponent implements OnInit {

  sub: Subscription;
  types: IAnimalType[];
  regions: IRegion[];
  pets: IAnimal[] | IShelter[];
  totalCount: number;
  shopParams = new ShopParams();
  decimalPipe = new DecimalPipe(navigator.language);


  pageSizeOptions = [this.shopParams.pageSize, 10, 15];
  @ViewChild('paginator', {static: true}) paginator: MatPaginator;
  @ViewChild('search', {static: false}) searchTerm: ElementRef;


  constructor(
    private typesService: TypesService,
    private regionsService: RegionsService,
    private petsService: PetsService
  ) {
    this.shopParams = petsService.getShopParams();
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

    this.translateMatPaginator();

    this.getAllTypes();
    this.getAllRegions();
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


  getAllTypes() {
    this.sub = this.typesService.GetAllTypes().subscribe((response) => {
      this.types = response;
    }, error => {
      console.log(error);
    });
  }

  getItems(useCache: boolean) {
    this.sub = this.petsService.getAll(useCache).subscribe((response: IPagination) => {
      this.pets = response.data;
      this.totalCount = response.count;
      this.paginator.pageSize = response.pageSize;
      this.shopParams.pageSize = this.paginator.pageSize;

    }, error => {
      console.log(error);
    });
  }




  onTypeSelected(typeId: number) {
    const params = this.petsService.getShopParams();
    if (typeId !== params.typeIdSelected) {
      params.typeIdSelected = typeId;
    } else {
      params.typeIdSelected = 0;
    }
    params.pageNumber = 0;
    this.petsService.setShopParams(params);
    this.getItems(false);
  }

  onSortSelected(sort: string) {
    const params = this.petsService.getShopParams();
    params.sortSelected = sort;
    params.pageNumber = 0;
    this.petsService.setShopParams(params);
    this.getItems(false);
  }

  onSearch() {
    const params = this.petsService.getShopParams();
    params.search = this.searchTerm.nativeElement.value;
    params.pageNumber = 0;
    this.petsService.setShopParams(params);
    this.getItems(false);
  }

  onReset() {
    this.searchTerm.nativeElement.value = undefined;
    this.searchTerm.nativeElement.value = '';

    const params = new ShopParams();
    params.search = undefined;
    this.petsService.setShopParams(params);
    console.log(this.searchTerm.nativeElement.value);
    this.getItems(false);
    this.shopParams = this.petsService.getShopParams();
  }



  ngAfterViewInit(): void {
    if (this.paginator) {
      this.paginator.page.subscribe(() => {
      const shopParams = this.petsService.getShopParams();
      shopParams.pageNumber = this.paginator.pageIndex;
      shopParams.pageSize = this.paginator.pageSize;
      this.petsService.setShopParams(shopParams);
      this.getItems(false);
    });
    }

    setTimeout(() => {
      this.getItems(false)
    }, 100);

  }

  onRegionSelected(regionId: number) {
    const params = this.petsService.getShopParams();
    if (regionId !== params.regionIdSelected) {
      params.regionIdSelected = regionId;
    } else {
      params.regionIdSelected = 0;
    }
    params.pageNumber = 0;
    this.petsService.setShopParams(params);
    this.getItems(false);
  }



  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
