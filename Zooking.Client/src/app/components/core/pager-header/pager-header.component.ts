import { Component, OnInit, Input } from '@angular/core';
import { IAssistant } from 'src/app/shared/models/animals/assistant';

@Component({
  selector: 'app-pager-header',
  templateUrl: './pager-header.component.html',
  styleUrls: ['./pager-header.component.scss']
})
export class PagerHeaderComponent implements OnInit {
  @Input() products: IAssistant[];
  @Input() totalCount: number;

  constructor() { }

  ngOnInit() {
  }

}
