import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssistantsComponent } from './assistants.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MaterialModule } from 'src/app/shared/material.module';
import { MatBtnSmallModule } from 'src/app/components/kit/buttons/mat-btn-small/mat-btn-small.module';
import { RouterModule } from '@angular/router';
import { TitleModule } from 'src/app/components/kit/title/title.module';
import { ItemFormModule } from './item-form/item-form.module';
import { CardModule } from 'src/app/components/kit/card/card.module';


@NgModule({
  declarations: [
    AssistantsComponent
  ],
  imports: [
    CommonModule,
    MatPaginatorModule,
    MaterialModule,
    MatBtnSmallModule,
    RouterModule,
    TitleModule,
    ItemFormModule,
    CardModule
  ],
  exports: [
    AssistantsComponent
  ]
})
export class AssistantsModule { }
