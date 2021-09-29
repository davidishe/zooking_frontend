import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemsComponent } from './items.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MaterialModule } from 'src/app/shared/material.module';
import { CardModule } from 'src/app/components/kit/card/card.module';
import { MatBtnSmallModule } from 'src/app/components/kit/buttons/mat-btn-small/mat-btn-small.module';
import { RouterModule } from '@angular/router';
import { ItemFormModule } from 'src/app/components/kit/item-form/item-form.module';
import { ItemDetailedCardModule } from 'src/app/components/kit/item-detailed-card/item-detailed-card.module';

const UserModules = [
  CommonModule,
  MatPaginatorModule,
  MaterialModule,
  CardModule,
  RouterModule,
  ItemFormModule,
  MatBtnSmallModule
];

@NgModule({
  declarations: [
    ItemsComponent
  ],
  imports: [
    UserModules  
  ],
  exports: [
    ItemsComponent
  ]
})
export class ItemsModule { }
