import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputDatepickerComponent } from './input-datepicker.component';
import { MaterialModule } from 'src/app/shared/material.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '../../core.module';



@NgModule({
  declarations: [
    InputDatepickerComponent
  ],
  imports: [
    CommonModule,
    MatDatepickerModule,
  ],
  exports: [
    InputDatepickerComponent
  ]
})
export class InputDatepickerModule { }
