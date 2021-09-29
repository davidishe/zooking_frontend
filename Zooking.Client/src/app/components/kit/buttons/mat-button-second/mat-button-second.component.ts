import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-mat-button-second',
  templateUrl: './mat-button-second.component.html',
  styleUrls: ['./mat-button-second.component.scss']
})
export class MatButtonSecondComponent  {

  @Input() text!: string;
  @Input() disabled?: boolean;
  @Input() backgroundColor?: string;
  @Input() icon?: string;


}
