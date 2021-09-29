import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Input, Injectable } from '@angular/core';
import { IAnimal } from 'src/app/shared/models/animals/animal';
import { Subscription } from 'rxjs';
import { IPagination } from 'src/app/shared/models/pagination';
import { IAnimalType } from 'src/app/shared/models/type';
import { IRegion } from 'src/app/shared/models/region';
import { ShopParams } from 'src/app/shared/models/shopParams';
import { MatPaginator } from '@angular/material/paginator';
import { DecimalPipe } from '@angular/common';
import { ShopService } from 'src/app/services/products/shop.service';
import { SideNavService } from 'src/app/services/side-nav.service';
import { IShelter } from 'src/app/shared/models/shelters/shelter';

type IITem = IAnimal | IShelter;

@Component({
  selector: 'app-items-layout',
  templateUrl: './items-layout.component.html',
  styleUrls: ['./items-layout.component.scss']
})

export class ItemsLayoutComponent {

  @Input() items: IITem[];
  @Input() types: IAnimalType[];
  @Input() regions: IRegion[];
  @Input() totalCount: number;
  @Input() shopParams = new ShopParams();
  @Input() link?: string;
  @Input() type?: string;



  constructor(
    private shopService: ShopService,
    public sideNavService: SideNavService

  ) {
  }


  deleteEmitedItem(item: IITem) {
    console.log('item is deleted');
    
  }

















}