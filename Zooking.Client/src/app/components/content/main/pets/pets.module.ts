import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemsLayoutModule } from '../items-layout/items-layout.module';
import { PetsComponent } from './pets.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MaterialModule } from 'src/app/shared/material.module';
import { MatBtnSmallModule } from 'src/app/components/kit/buttons/mat-btn-small/mat-btn-small.module';
import { RouterModule } from '@angular/router';
import { TitleModule } from 'src/app/components/kit/title/title.module';


@NgModule({
  declarations: [
    PetsComponent
  ],
  imports: [
    CommonModule,
    ItemsLayoutModule,
    MatPaginatorModule,
    MaterialModule,
    MatBtnSmallModule,
    RouterModule,
    TitleModule
  ],
  exports: [
    PetsComponent
  ]
})
export class PetsModule { }
