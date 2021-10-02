import { Component, Input } from '@angular/core';
import { IAnimalType } from 'src/app/shared/models/type';
import { IRegion } from 'src/app/shared/models/region';
import { ShopParams } from 'src/app/shared/models/shopParams';
import { SideNavService } from 'src/app/services/side-nav.service';
import { IAssistant } from 'src/app/shared/models/animals/assistant';

type IITem = IAssistant;

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
    public sideNavService: SideNavService

  ) {
  }


  deleteEmitedItem(item: IITem) {
    console.log('item is deleted');
    
  }

















}