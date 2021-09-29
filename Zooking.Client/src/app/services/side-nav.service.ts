import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SideNavService {

public opened?: boolean = false;

constructor() { }

toggle() {
  this.opened = !this.opened;
}

isOpened(): boolean {
  return this.opened;
}

closeNavSide(): void {
  this.opened = false;
}

openNavSide(): void {
  this.opened = true;
}

}
