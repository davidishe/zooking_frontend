import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { IUser } from 'src/app/shared/models/user/user';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IAddress } from 'src/app/shared/models/user/address';
import { ExternalAuthResult } from 'src/app/shared/models/user/externalAuthResult';
import { IUserForUpdate } from 'src/app/shared/models/user/userForUpdate';

@Injectable({providedIn: 'root'})

export class AccountService {

  baseUrl = environment.authUrl;
  private currentUserSource = new BehaviorSubject<IUser>(null);
  currentUser$ = this.currentUserSource.asObservable();

  userId: number;
  returnUrl = 'onboarding';

  // currentUser: IUser = {
  //   email: ''
  // };


  constructor(
    public http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  login(values: any) {
    return this.http.post<any>(this.baseUrl + 'login', values).pipe(
      map((user: IUser) => {
        if (user) {
          localStorage.setItem('garden-app-token', user.token);
          this.currentUserSource.next(user);
          if (user.isOnboarded) {
            this.router.navigateByUrl('/');
          }
          if (!user.isOnboarded) {
            this.router.navigateByUrl('onboarding');
          }
        }
      })
    );
  }

  register(values: any) {
    return this.http.post<any>(this.baseUrl + 'register', values).pipe(
      map((user: IUser) => {
        if (user) {
          localStorage.setItem('garden-app-token', user.token);
          this.currentUserSource.next(user);
          this.router.navigateByUrl(this.returnUrl);
          this.returnUrl = null;

        }
      }, err => {
      })
    );
  }

  logout() {
    localStorage.removeItem('garden-app-token');
    this.currentUserSource.next(null);
    this.router.navigateByUrl('/');
    this.openSnackBar('до новой встречи ))');
  }

  checkEmailExists(email: string) {
    return this.http.get<any>(this.baseUrl + 'checkmail/?email=' + email);
  }

  loadCurrentUser() {
    return this.http.get(this.baseUrl + 'current').pipe(
      map((user: IUser) => {
        if (user) {
          localStorage.setItem('garden-app-token', user.token);
          this.logedIn();
          this.currentUserSource.next(user);
          this.checkAdminRights();
          return user;
        }

      })
    );
  }

  checkAdminRights(): boolean {
    const user = this.getCurrentUserValue();
    if (user && user.userRoles) {
      for (let i = 0; i < user.userRoles.length; i++) {
      const role = user.userRoles[i];
      if (role === 'Admin') {
        return true;
      }
    }
    }
    return false;
  }


  getCurrentUserRoles(): string[] {
    const user = this.getCurrentUserValue();
    if (user) {
      return user.userRoles;
    }
  }


  getCurrentUserProfile() {
    return this.http.get(this.baseUrl + 'current/profile');
  }


  getCurrentUserValue() {
    return this.currentUserSource.value;
  }


  getFacebookAccessToken(code: string) {
    return this.http.get(this.baseUrl + 'facebook/tokenget?code=' + code);
  }


  getGoogleAccessToken(code: string) {
    return this.http.get(this.baseUrl + 'google/tokenget?code=' + code);
  }


  signInFacebook() {
    const redirectUrl = 'https://localhost:4200/account';
    const clientId = '359920132083502';
    window.location.href = 'https://www.facebook.com/v8.0/dialog/oauth?client_id=' + clientId + '&redirect_uri=' + redirectUrl;
  }

  // TODO: move to another service file
  signInGoogle() {
    const redirectUrl = 'https://localhost:4200/account';
    const clientId = '263769089352-26v7o8794c42njl3u591acssfsuo0th3.apps.googleusercontent.com';
    const state = '123123123123123123123';
    const googleBaseUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
    const googleParams = '?scope=openid%20profile%20email&access_type=offline&include_granted_scopes=true&response_type=code&state=';
    const googleUrl = googleBaseUrl + googleParams + state + '&redirect_uri=' + redirectUrl +  '&client_id=' + clientId;
    window.location.href = googleUrl;

  }


  authorize(user: any) {
    return this.http.post<any>(this.baseUrl + 'register', user)
      .pipe(
        map((response: any) => {
        if (response) {
          this.login(user);
        }
      })
    );
  }


  logedIn() {
    this.userId = +localStorage.getItem('userId');
    return true;
  }


  authenticateWithFacebook(authToken: string) {
    return this.http.post(this.baseUrl + 'auth/facebook?accessToken=' + authToken, null).pipe(
      map((res: ExternalAuthResult) => {
        localStorage.setItem('garden-app-token', res.token);
        this.currentUserSource.next(res.user);
        this.router.navigateByUrl(this.returnUrl);
        this.returnUrl = null;
        return res;
      })
    );
  }


  authenticateWithGoogle(authToken: string) {
    return this.http.post(this.baseUrl + 'google/auth?accessToken=' + authToken, null).pipe(
      map((res: any) => {
        localStorage.setItem('garden-app-token', res.token);
        this.currentUserSource.next(res.user);
        this.router.navigateByUrl(this.returnUrl);
        this.returnUrl = null;
        return res;
      })
    );
  }


  checkEmailNotTaken(email: string) {
    return this.http.get<any>(this.baseUrl + 'checkmail/?email=' + email).pipe(
      map(res => {
        return res;
      })
    );
  }


  getUserAddress() {
    return this.http.get(this.baseUrl + 'address');
  }


  updateUserProfile(user: IUserForUpdate) {
    return this.http.put<IUser>(this.baseUrl + 'update', user);
  }


  updateUserAddress(address: IAddress) {
    return this.http.put<IAddress>(this.baseUrl + 'address', address);
  }


  setOnboardedStatus() {
    return this.http.put<boolean>(this.baseUrl + 'onboarded', null);
  }


  openSnackBar(message: string) {
    this.snackBar.open(message, '', {duration: 2500});
  }


}

