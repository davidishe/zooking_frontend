import { Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-mat-btn-small',
  templateUrl: './mat-btn-small.component.html',
  styleUrls: ['./mat-btn-small.component.scss']
})
export class MatBtnSmallComponent {

  @Input() text!: string;
  @Input() icon?: string;
  @Input() disabled?: boolean;
  @Input() type: string;


  // @ViewChild('smallBtn', {static: false}) pRef!: ElementRef;

}
