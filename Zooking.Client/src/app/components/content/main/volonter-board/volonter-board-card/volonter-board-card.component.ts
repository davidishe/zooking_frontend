import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-volonter-board-card',
  templateUrl: './volonter-board-card.component.html',
  styleUrls: ['./volonter-board-card.component.scss']
})
export class VolonterBoardCardComponent implements OnInit {

  @Input() avatarPath: string;
  @Input() title: string;


  constructor() { }

  ngOnInit() {
  }

}
