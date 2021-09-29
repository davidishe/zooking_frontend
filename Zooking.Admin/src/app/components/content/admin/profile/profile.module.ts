import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogContentComponent, ProfileComponent } from './profile.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'src/app/components/kit/inputs/input-text/input-text.module';
import { LabelTextFieldModule } from 'src/app/components/kit/inputs/label-text-field/label-text-field.module';
import { TitleModule } from 'src/app/components/kit/title/title.module';
import { IconModule } from '../../../kit/icon/icon.module';
import { MatBtnSmallModule } from 'src/app/components/kit/buttons/mat-btn-small/mat-btn-small.module';
import { MatDialogModule } from '@angular/material/dialog';




@NgModule({
  declarations: [
    ProfileComponent,
    DialogContentComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    InputTextModule,
    LabelTextFieldModule,
    ReactiveFormsModule,
    TitleModule,
    IconModule,
    MatBtnSmallModule,
    MatDialogModule
  ],
  exports: [
    ProfileComponent
  ]
})
export class ProfileModule { }
