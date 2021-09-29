import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { SideNavService } from 'src/app/services/side-nav.service';


@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
})
export class BannerComponent  {

    constructor(
    public sideNavService: SideNavService
    ) {
  }

}
