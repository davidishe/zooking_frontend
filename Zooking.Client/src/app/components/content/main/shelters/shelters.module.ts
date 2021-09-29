import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SheltersComponent } from './shelters.component';
import { ItemsLayoutModule } from '../items-layout/items-layout.module';
import { MaterialModule } from 'src/app/shared/material.module';
import { MatBtnSmallModule } from 'src/app/components/kit/buttons/mat-btn-small/mat-btn-small.module';
import { RouterModule } from '@angular/router';
import { TitleModule } from 'src/app/components/kit/title/title.module';

const UserModules = [
  CommonModule,
  ItemsLayoutModule,
  MaterialModule,
  MatBtnSmallModule,
  RouterModule,
  TitleModule
];

@NgModule({
  declarations: [
    SheltersComponent
  ],
  imports: [
    UserModules
  ],
  exports: [
    SheltersComponent
  ]
})
export class SheltersModule { }
