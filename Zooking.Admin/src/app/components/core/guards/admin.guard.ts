import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AccountService } from '../../layouts/account/account.service';
import { state } from '@angular/animations';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({  providedIn: 'root'})

export class AdminGuard implements CanActivate {

  constructor(
    private accountService: AccountService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.accountService.currentUser$.pipe(
      map(auth => {
        const isAdmin = this.accountService.checkAdminRights();
          if (isAdmin) { return true; }
          if (!isAdmin) {
            this.openSnackBar('Недостаточно прав доступа');
            this.router.navigate(['/'], {queryParams: {returnUrl: state.url}});
            return false;
          }          
      })
    );
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, '', {duration: 2500});
  }

}
