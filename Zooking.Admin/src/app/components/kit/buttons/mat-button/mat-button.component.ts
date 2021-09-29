import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-mat-button',
  templateUrl: './mat-button.component.html',
  styleUrls: ['./mat-button.component.scss']
})
export class MatButtonComponent  {

  @Input() text!: string;
  @Input() disabled?: boolean;
  @Input() backgroundColor: string;
  @Input() icon: string;


}
