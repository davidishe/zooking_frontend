import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-help-board-card',
  templateUrl: './help-board-card.component.html',
  styleUrls: ['./help-board-card.component.scss']
})
export class HelpBoardCardComponent implements OnInit {

  @Input() avatarPath: string;
  @Input() title: string;


  constructor() { }

  ngOnInit() {
  }

}
