import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/components/layouts/account/account.service';

@Component({
  selector: 'app-login-btn-facebook',
  templateUrl: './login-btn-facebook.component.html',
  styleUrls: ['./login-btn-facebook.component.scss']
})
export class LoginBtnFacebookComponent implements OnInit {

  constructor(
    private accountService: AccountService
  ) { }

  ngOnInit(): void {
  }

  signInWithFacebook(): void {
    this.accountService.signInFacebook();
  }

}
