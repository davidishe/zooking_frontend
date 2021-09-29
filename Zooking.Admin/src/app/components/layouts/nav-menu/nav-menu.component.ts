import { Component, OnInit, AfterViewInit, HostListener } from '@angular/core';
import {  Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SideNavService } from 'src/app/services/side-nav.service';
import { IUser } from 'src/app/shared/models/user/user';
import { AccountService } from '../../layouts/account/account.service';
import { NavStateService } from './services/nav-state.service';
import { ThemeService } from './services/theme.service';
import { WindowService } from './services/window.service';




@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})

export class NavMenuComponent implements OnInit, AfterViewInit {


  currentUser$!: Observable<IUser | any>;
  menuState$!: Observable<number | any>;


  // menu variables
  isMenuOpen!: boolean;
  topMenu: boolean = true;
  isSearching!: boolean;


  scrollMenuVisibilitty: boolean = true;

  constructor(
    public accountService: AccountService,
    private windowService: WindowService,
    public navStateService: NavStateService,
    private themeService: ThemeService,
    public sideNavService: SideNavService,
    private router: Router  ) {
          // var x = this.router.getCurrentNavigation().extras.state.example;
          // console.log(x);
          
  }


  @HostListener('window:click', ['$event'])
    onCloseTopMenu(event: any): void {
      // this.navStateService.adjustNavMenu();
      if (!event.target.id.includes('userinfo')) {
        this.scrollMenuVisibilitty = true;
      }
    }


  ngOnInit(): void {

    this.currentUser$ = this.accountService.currentUser$;
    this.menuState$ = this.navStateService.navState$;
    this.navStateService.closeNavMenu();

    


    // TODO: move to lazy module
    this.windowService.addEventListenerForNav();
    this.themeService.checkDarkModeStatus();
  }


  toogleMenu(event: any, num: number): void {
    const menuBlock = this.navStateService.getNavState();
    this.navStateService.openDropdownMenu(event, num, menuBlock);
  }


  isMenuActive(menuNum: number): boolean {
    const navState = this.navStateService.getNavState();
    if (menuNum === navState) {
      this.navStateService.setNavState(menuNum);
      return true;
    } else {
      return false;
    }
  }


  ngAfterViewInit(): void {
    this.loadCurrentUser();
    this.isBtnBurgerVisible();
    // this.sideNavService.closeNavSide();
  }



  displayCounter(resultFromChild: any): void {
    if (resultFromChild) {
      this.navStateService.closeNavMenu();
    }
  }

  logout(): void {
    this.accountService.logout();
  }

  toggleThemeMode(): void {
    this.themeService.switchMode();
  }

  loadCurrentUser(): void {
    this.accountService.loadCurrentUser().subscribe(() => {
      }, () => {
    });
  }



  isBtnBurgerVisible(): boolean {
    const href = this.router.url;
    return true;
  }





}
