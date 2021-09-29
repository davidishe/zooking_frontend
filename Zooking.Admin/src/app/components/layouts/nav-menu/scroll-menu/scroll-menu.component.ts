import { AfterViewInit, Component, HostListener, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountService } from 'src/app/components/layouts/account/account.service';
import { IUser } from 'src/app/shared/models/user/user';
import { NavStateService } from '../services/nav-state.service';
import { WindowService } from '../services/window.service';


@Component({
  selector: 'app-scroll-menu',
  templateUrl: './scroll-menu.component.html',
  styleUrls: ['./scroll-menu.component.scss']
})
export class ScrollMenuComponent implements OnInit, AfterViewInit {

  currentUser$!: Observable<IUser | any>;
  userId: number;

  constructor(
    public accountService: AccountService,
    private navStateMenuService: NavStateService,
    private windowService: WindowService
  ) { }

  // @HostListener('window:pointermove', ['$event'])
  // onDocumentMousewheelEvent(event): void {
  //   this.navStateMenuService.adjustNavMenu();
  // }

  ngOnInit(): void {
    this.currentUser$ = this.accountService.currentUser$;
    this.navStateMenuService.adjustNavMenu();
    this.getUserId();
  }

  getUserId(): void {
    this.userId = this.accountService.userId;
  }


  ngAfterViewInit(): void {
    // TODO: move to lazy module
    this.windowService.addEventListenerForScrollMenu();
  }

  logout(): void {
    this.accountService.logout();
  }



}
