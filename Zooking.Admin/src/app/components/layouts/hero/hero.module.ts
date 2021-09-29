import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroComponent } from './hero.component';
import { BannerComponent } from '../banner/banner.component';
import { BannerBigModule } from '../banner-big/banner-big.module';
import { MatButtonModule } from '../../kit/buttons/mat-button/mat-button.module';
import { RouterModule } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [
    HeroComponent,
    BannerComponent,
  ],
  imports: [
    CommonModule,
    BannerBigModule,
    MatButtonModule,
    RouterModule,
    MatTooltipModule
  ],
  exports: [
    HeroComponent,
    BannerComponent
  ]
})
export class HeroModule { }
