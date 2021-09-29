import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/components/layouts/account/account.service';

@Component({
  selector: 'app-login-btn-google',
  templateUrl: './login-btn-google.component.html',
  styleUrls: ['./login-btn-google.component.scss']
})
export class LoginBtnGoogleComponent {

  constructor(
    private accountService: AccountService,
  ) { }

  signInWithGoogle(): void {
    this.accountService.signInGoogle();
  }

}
