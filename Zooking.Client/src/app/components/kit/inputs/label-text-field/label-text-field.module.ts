import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LabelTextFieldComponent } from './label-text-field.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatBtnSmallModule } from '../../buttons/mat-btn-small/mat-btn-small.module';



@NgModule({
  declarations: [
    LabelTextFieldComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatBtnSmallModule,
    RouterModule
  ],
  exports: [
    LabelTextFieldComponent
  ]
})
export class LabelTextFieldModule { }
