import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-banner-big',
  templateUrl: './banner-big.component.html',
  styleUrls: ['./banner-big.component.scss']
})
export class BannerBigComponent implements OnInit {

  @Input() btnText: string;
  @Input() btnIcon: string;
  @Input() subText: string;
  @Input() mainText: string;
  @Input() path: string;
  @Input() btnDisabled?: boolean;
  @Input() inProcessVisible?: boolean;


  constructor() { }

  ngOnInit() {
  }

}
