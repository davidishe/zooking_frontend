import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })

@Injectable()
export class NavStateService {

  // navState: number;
  private navStateSource = new BehaviorSubject<number | null>(null);
  navState$ = this.navStateSource.asObservable();


  constructor() { }

  closeNavMenu(): void {
    this.navStateSource.next(0);
  }

  getNavState(): number | null {
    return this.navStateSource.value;
  }

  setNavState(menuBlock: number): void {
    this.navStateSource.next(menuBlock);
  }



  adjustNavMenu(): void {
    const userAcc = document.getElementById('userinfo');
    const topMenu = document.getElementById('top_menu');

    if (userAcc && topMenu) {
      // const userAccRight = userAcc.style.left;
      // const right = (userAccRight + 1250) + 'px';
      // topMenu.style.left = right;

    }
  }

  openDropdownMenu(event: any, num: number, menuBlock: number | null): void {
      console.log(event.view.navigator.userAgent);

      if (!event.view.navigator.userAgent.includes('iPad')) {
      console.log(event.type);
      // desctop
      console.log('mobile');
      if (menuBlock === num) {
        this.setNavState(0);
      } else {
        this.setNavState(num);
      }

      // mobile
      } else {
      if (event.type !== 'mouseover') {
        console.log('mobile');
        if (menuBlock === num) {
          this.setNavState(0);
        } else {
          // event.type === 'click'
          this.setNavState(num);
        }

      }
      }
  }



}
