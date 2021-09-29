import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnboardingRoutingModule } from './onboarding-routing.module';
import { OnboardingComponent } from './onboarding.component';
import { TitleModule } from '../../kit/title/title.module';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { OnboardingItemComponent } from './onboarding-item/onboarding-item.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatBtnSmallModule } from '../../kit/buttons/mat-btn-small/mat-btn-small.module';
import { MatTabsModule } from '@angular/material/tabs';



const UserModules = [
  OnboardingRoutingModule,
  TitleModule,
  MatSlideToggleModule,
  ReactiveFormsModule,
  MatBtnSmallModule,
  MatTabsModule
];


@NgModule({
  declarations: [
    OnboardingComponent,
    OnboardingItemComponent
  ],
  imports: [
    CommonModule,
    UserModules
  ]
})
export class OnboardingModule { }
