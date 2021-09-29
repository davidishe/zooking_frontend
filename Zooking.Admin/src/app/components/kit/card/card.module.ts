import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatBtnSmallModule } from '../buttons/mat-btn-small/mat-btn-small.module';
import { MatButtonModule } from '../buttons/mat-button/mat-button.module';
import { RouterModule } from '@angular/router';
import { MatCardHeroComponent } from './mat-card-hero/mat-card-hero.component';
import { MatIconModule } from '@angular/material/icon';
import { IconModule } from '../icon/icon.module';



@NgModule({
  declarations: [
    MatCardHeroComponent
  ],
  imports: [
    CommonModule,
    MatBtnSmallModule,
    MatButtonModule,
    RouterModule,
    IconModule
  ],
  exports: [
    MatCardHeroComponent
  ]
})
export class CardModule { }
