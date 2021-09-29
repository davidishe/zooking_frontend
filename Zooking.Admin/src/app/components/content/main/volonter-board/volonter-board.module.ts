import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VolonterBoardComponent } from './volonter-board.component';
import { VolonterBoardCardComponent } from './volonter-board-card/volonter-board-card.component';
import { TitleModule } from 'src/app/components/kit/title/title.module';
import { MatBtnSmallModule } from 'src/app/components/kit/buttons/mat-btn-small/mat-btn-small.module';



@NgModule({
  declarations: [
    VolonterBoardComponent,
    VolonterBoardCardComponent
  ],
  imports: [
    CommonModule,
    TitleModule,
    MatBtnSmallModule
  ],
  exports: [
    VolonterBoardComponent,
    VolonterBoardCardComponent
  ]
})
export class VolonterBoardModule { }
