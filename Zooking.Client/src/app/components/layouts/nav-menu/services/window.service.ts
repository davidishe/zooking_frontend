import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { NavStateService } from './nav-state.service';


@Injectable()
export class WindowService {

  renderer: boolean;
  menuClosed!: boolean;

  constructor(
    @Inject(PLATFORM_ID) platformId: any,
    private navStateService: NavStateService
  ) {
    this.renderer = isPlatformBrowser(platformId) ? true : false;
  }


  getWindowSize(): number | null {
    return window.innerWidth;
  }


  // add event listener for drop down nav menu
  addEventListenerForNav(): void {
    if (this.renderer) {
      window.addEventListener('mouseover', (event: any) => {
        if (event !== null && event.target !== null) {
          if (
              event.target.classList.contains('nav-app') ||
              event.target.classList.contains('wrapper') ||
              event.target.classList.contains('nav-pro') ||
              event.target.classList.contains('nav-title') ||
              event.target.classList.contains('nav-app') ||
              event.target.classList.contains('nav-item-link')
              &&
              !event.target.classList.contains('overlay')
          ) {
            this.navStateService.closeNavMenu();
          }
        }
      }, {passive: true});

      window.addEventListener('click', (event: any) => {
        if (event !== null) {
          if (
              event.target.className === 'menu'
          ) {
            this.navStateService.closeNavMenu();
          }
        }
      }, {passive: true});

    }

  }


  addEventListenerForScrollMenu(): any {
    window.addEventListener('resize', (event: any) => {
      if (event !== null) {
        this.navStateService.adjustNavMenu();
      }
    }, {passive: true});
  }






}
