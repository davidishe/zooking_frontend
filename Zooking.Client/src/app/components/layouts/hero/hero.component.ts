import { Component, OnInit, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { BusyService } from 'src/app/services/infrastructure/busy.service';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements OnInit, AfterViewInit {


  constructor(
    public busyService: BusyService,
    private cdr: ChangeDetectorRef
  ) {  }


  ngOnInit() {

  }

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }




}
