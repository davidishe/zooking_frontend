import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';
import { MaterialModule } from 'src/app/shared/material.module';
import { ChipListComponent } from './chip-list.component';



@NgModule({
  declarations: [
    ChipListComponent
  ],
  imports: [
    CommonModule,
    MatChipsModule,
    MaterialModule
  ],
  exports: [
    ChipListComponent
  ]
})
export class ChipListModule { }
