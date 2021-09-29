import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemFormComponent } from './item-form.component';
import { MatBtnSmallModule } from '../buttons/mat-btn-small/mat-btn-small.module';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from '../inputs/input-text/input-text.module';



@NgModule({
  declarations: [
    ItemFormComponent
  ],
  imports: [
    CommonModule,
    MatBtnSmallModule,
    InputTextModule,
    RouterModule,
    ReactiveFormsModule
  ],
  exports: [
    ItemFormComponent
  ]
})
export class ItemFormModule { }
