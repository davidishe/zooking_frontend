import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AccountService } from '../../layouts/account/account.service';
import { state } from '@angular/animations';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IUser } from 'src/app/shared/models/user/user';

@Injectable({  providedIn: 'root'})

export class OnboardingPageGuard implements CanActivate {

  constructor(
    private accountService: AccountService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.accountService.currentUser$.pipe(
      map(auth => {
        const user = this.accountService.getCurrentUserValue();
        console.log(user);
        if (auth && user.isOnboarded) {
          this.router.navigate(['/']);
          return false;
        }
        if (auth && !user.isOnboarded) {
          return true;
        }
      })
    );
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, '', {duration: 2500});
  }

}
