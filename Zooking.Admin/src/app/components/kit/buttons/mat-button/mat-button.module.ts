import { CommonModule } from '@angular/common';
import { Input, NgModule } from '@angular/core';
import { MatButtonComponent } from './mat-button.component';



@NgModule({
  declarations: [MatButtonComponent],
  imports: [CommonModule],
  exports: [MatButtonComponent]
})
export class MatButtonModule {
}
