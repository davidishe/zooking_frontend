import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SideNavService } from 'src/app/services/side-nav.service';
import { IUser } from 'src/app/shared/models/user/user';
import { FormGroup, FormControl, Validators, AsyncValidatorFn } from '@angular/forms';
import { DisplayService } from 'src/app/services/display.service';
import { AccountService } from '../account.service';
import { timer, of } from 'rxjs';
import { switchMap, map, finalize, tap } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  errors: string[];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public accountService: AccountService,
    private snackBar: MatSnackBar,
    private sideNavService: SideNavService,
    public displayService: DisplayService
    ) {
  }

  user: IUser;
  formRegister: FormGroup;
  isActive: boolean;
  returnUrl: string;


  ngOnInit(): void {
    this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl || '/' ;
    this.createRegisterForm();
    this.sideNavService.opened = false;
    this.isActive = true;
  }

  createRegisterForm() {
    this.formRegister = new FormGroup({
    inputDisplayName: new FormControl(null, [Validators.required]),
    inputLogin: new FormControl(null,
      [Validators.required, Validators.email]),
    inputPassword: new FormControl(null,
      [Validators.required,
      Validators.minLength(6)])
    });
  }

  onSubmit() {
    if (this.formRegister.invalid) {
      console.log(this.formRegister.controls.inputLogin.errors);
      return;
    } else {
      this.user = {
        displayName: this.formRegister.controls.inputDisplayName.value,
        email: this.formRegister.controls.inputLogin.value,
        password: this.formRegister.controls.inputPassword.value,
      };

      this.accountService.register(this.user).subscribe(() => {
        this.openSnackBar('добро пожаловать');
        this.onSuccessAuthorize();
        
      }, error => {
        console.log(error);
        this.errors = error.errors;
        console.log(this.errors);
        this.openSnackBar('что-то пошло не так');
      });

    }
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, '', {duration: 2500});
  }

  onSuccessAuthorize() {
    this.openSnackBar('привет!');
    this.router.navigateByUrl(this.returnUrl);
  }

  changePasswordType() {
    this.isActive = !this.isActive;
  }



}
