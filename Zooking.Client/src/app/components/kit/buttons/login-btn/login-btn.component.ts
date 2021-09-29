import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/components/layouts/account/account.service';
import { IUser } from 'src/app/shared/models/user/user';

@Component({
  selector: 'app-login-btn',
  templateUrl: './login-btn.component.html',
  styleUrls: ['./login-btn.component.scss']
})
export class LoginBtnComponent implements OnInit {

  @Input() form!: FormGroup;
  user: IUser | any;
  loggedIn: boolean | any;
  returnUrl: string | any;

  @Input() disabled?: boolean;
  @Input() text: string;

  constructor(
    private router: Router,
    private accountService: AccountService,
  ) {}

  ngOnInit(): void {
  }

  // onSubmit(): void {
  //   console.log('hello');
  //   if (this.form.invalid) {
  //       return;
  //     } else {
  //       this.user = {
  //         email: this.form.controls.inputEmailLogin.value,
  //         password: this.form.controls.inputPassword.value
  //       };
  //       this.loginWithUser();

  //     }
  // }

  // loginWithUser(): void {
  //   this.accountService.login(this.user).subscribe(() => {
  //   this.onSuccessAuthorize();
  //   }, (err: any) => {
  //     console.log(err);
  //     this.openSnackBar('что-то пошло не так!');
  //   });
  // }


  openSnackBar(message: string): void {
    console.log(message);
  }

  // onSuccessAuthorize(): void {
  //   this.openSnackBar('и снова привет!');
  //   this.router.navigateByUrl(this.returnUrl);
  // }

}
