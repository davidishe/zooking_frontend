import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HelpBoardComponent } from './help-board.component';
import { HelpBoardCardComponent } from './help-board-card/help-board-card.component';
import { TitleModule } from 'src/app/components/kit/title/title.module';
import { MatBtnSmallModule } from 'src/app/components/kit/buttons/mat-btn-small/mat-btn-small.module';



@NgModule({
  declarations: [
    HelpBoardComponent,
    HelpBoardCardComponent
  ],
  imports: [
    CommonModule,
    TitleModule,
    MatBtnSmallModule
  ],
  exports: [
    HelpBoardComponent,
    HelpBoardCardComponent
  ]

})
export class HelpBoardModule { }
