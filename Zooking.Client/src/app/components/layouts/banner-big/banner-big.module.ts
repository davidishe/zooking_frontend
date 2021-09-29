import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatBtnSmallModule } from '../../kit/buttons/mat-btn-small/mat-btn-small.module';
import { MatButtonModule } from '../../kit/buttons/mat-button/mat-button.module';
import { BannerBigComponent } from './banner-big.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    BannerBigComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    RouterModule
  ],
  exports: [
    BannerBigComponent
  ]
})
export class BannerBigModule { }
