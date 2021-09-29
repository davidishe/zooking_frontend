import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { UsersComponent } from './user/users/users.component';
import { MaterialModule } from 'src/app/shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { CoreModule } from '../../core/core.module';
import { UserCardComponent } from './user/user-card/user-card.component';
import { ChipListModule } from '../../kit/chip-list/chip-list.module';
import { MatButtonSecondModule } from '../../kit/buttons/mat-button-second/mat-button-second.module';
import { ProfileModule } from './profile/profile.module';
import { IconModule } from '../../kit/icon/icon.module';
import { TitleModule } from '../../kit/title/title.module';
import { MatBtnSmallModule } from '../../kit/buttons/mat-btn-small/mat-btn-small.module';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';



@NgModule({
  declarations: [
    AdminComponent,
    UsersComponent,
    UserCardComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    AdminRoutingModule,
    MatButtonSecondModule,
    MatBtnSmallModule,
    CoreModule,
    ChipListModule,
    ProfileModule,
    TitleModule,
    MatCheckboxModule,
  ]
})
export class AdminModule { }
