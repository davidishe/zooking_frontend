import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AccountRoutingModule } from './account-routing.module';
import { CoreModule } from '../../core/core.module';
import { AccountComponent } from './account.component';
import { MaterialModule } from 'src/app/shared/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginBtnFacebookComponent } from '../../kit/buttons/login-btn-facebook/login-btn-facebook.component';
import { LoginBtnGoogleComponent } from '../../kit/buttons/login-btn-google/login-btn-google.component';
import { LoginBtnComponent } from '../../kit/buttons/login-btn/login-btn.component';
import { InputTextModule } from '../../kit/inputs/input-text/input-text.module';
import { TitleModule } from '../../kit/title/title.module';


@NgModule({
  declarations: [
    LoginComponent, 
    RegisterComponent, 
    AccountComponent,
    LoginBtnFacebookComponent,
    LoginBtnGoogleComponent,
    LoginBtnComponent,
  ],
  imports: [
    CommonModule,
    CoreModule,
    AccountRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    InputTextModule,
    TitleModule,

  ]
})
export class AccountModule { }
