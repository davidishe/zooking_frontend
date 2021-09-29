import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, ChangeDetectorRef, AfterViewChecked, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SideNavService } from 'src/app/services/side-nav.service';
import { IUser } from 'src/app/shared/models/user/user';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AccountService } from '../account.service';
import { DisplayService } from 'src/app/services/display.service';
import { Subscription } from 'rxjs';
import { ShopService } from 'src/app/services/products/shop.service';
import { BusyService } from 'src/app/services/infrastructure/busy.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
    private sideNavService: SideNavService,
    private accountService: AccountService,
    public displayService: DisplayService,

  ) {
  }

  user: IUser;
  loggedIn: boolean;
  formLogin: FormGroup;
  isActive: boolean;
  returnUrl: string;
  fbLoginSub: Subscription;
  isLoading: boolean = false;
  code: string;
  ssoType: string;

  ngOnInit() {
    this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl || '/' ;
    console.log(this.isLoading);

    this.sideNavService.opened = false;
    this.isActive = true;
    this.initFormLogin();

    this.code = this.activatedRoute.snapshot.queryParams.code;
    this.ssoType = this.activatedRoute.snapshot.queryParams.scope;

    if (this.code && this.ssoType && this.ssoType.includes('google')) {
      this.isLoading = true;
      this.accountService.getGoogleAccessToken(this.code).subscribe((accessToken: any) => {
        this.isLoading = true;
        this.loginWithGoogleUser(accessToken.access_token);
      });
    }

    if (this.code && !this.ssoType) {
      this.isLoading = true;
      this.accountService.getFacebookAccessToken(this.code).subscribe((accessToken: any) => {
        this.isLoading = true;
        this.loginWithFacebookUser(accessToken.access_token);
      });
    }

  }


  initFormLogin() {
    this.formLogin = new FormGroup({
      inputEmailLogin: new FormControl(null,
        [Validators.required,
        Validators.email]),
      inputPassword: new FormControl(null,
        [Validators.required,
        Validators.minLength(6)])
    });
  }

  fnSubmit() {
    if (this.formLogin.invalid) {
      console.log(this.formLogin.controls.inputEmailLogin.errors);
      return;
    } else {
      this.user = {
        email: this.formLogin.controls.inputEmailLogin.value,
        password: this.formLogin.controls.inputPassword.value
      };
      this.loginWithUser();

    }
  }

  loginWithUser() {
    this.accountService.login(this.user).subscribe(() => {
      this.onSuccessAuthorize();
    }, err => {
      console.log(err);
      this.openSnackBar('что-то пошло не так!');
    });
  }

  ngOnDestroy(): void {
    if (this.fbLoginSub) {
      this.fbLoginSub.unsubscribe();
    }
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, '', {duration: 2500});
  }

  changePasswordType() {
    this.isActive = !this.isActive;
  }

  onSuccessAuthorize() {
    this.openSnackBar('и снова привет!');
    this.router.navigateByUrl(this.returnUrl);
  }

  // facebook logic code
  signInWithFacebook() {
    this.ssoType = 'facebook';
    this.isLoading = true;
    this.accountService.signInFacebook();
  }

  // google open id connect logic code
  signInWithGoogle() {
    this.ssoType = 'google';
    this.isLoading = true;
    this.accountService.signInGoogle();
  }

  loginWithFacebookUser(accessToken: string) {
    this.isLoading = true;
    this.fbLoginSub = this.accountService.authenticateWithFacebook(accessToken).subscribe((res: any) => {

    }, err => {
      console.log(err);
      this.openSnackBar('что-то пошло не так!');
    });
  }

  loginWithGoogleUser(accessToken: string) {
    this.isLoading = true;
    this.fbLoginSub = this.accountService.authenticateWithGoogle(accessToken).subscribe((res: any) => {

    }, err => {
      console.log(err);
      this.openSnackBar('что-то пошло не так!');
    });
  }




}
