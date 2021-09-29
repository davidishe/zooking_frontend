import { Component, OnInit, Input, OnDestroy, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { error } from 'protractor';
import { AccountService } from './components/layouts/account/account.service';
import { SideNavService } from './services/side-nav.service';
import { IUser } from './shared/models/user/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy, AfterViewInit {
  sub: Subscription;

  constructor(
    private ref: ChangeDetectorRef,
    public accountService: AccountService,
    public sideNavService: SideNavService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {
    }

  ngOnInit(): void {
    this.ref.markForCheck();
    // this.loadCurrentUser();


  }



  loadCurrentUser() {
    const token = localStorage.getItem('garden-app-token');
    if (token) {
      this.accountService.loadCurrentUser().subscribe((res: IUser) => {
        if (res) {
          console.log(res);
        }
        
      }, (err: any) => {
        console.log(err);
      });
    }
  }




  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

}
