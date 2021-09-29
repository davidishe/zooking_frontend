import { Component, OnInit, Input } from '@angular/core';
import { IAnimal } from 'src/app/shared/models/animals/animal';

@Component({
  selector: 'app-pager-header',
  templateUrl: './pager-header.component.html',
  styleUrls: ['./pager-header.component.scss']
})
export class PagerHeaderComponent implements OnInit {
  @Input() products: IAnimal[];
  @Input() totalCount: number;

  constructor() { }

  ngOnInit() {
  }

}
