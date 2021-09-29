import { Component, ElementRef, Input, OnInit, Self, ViewChild } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
  selector: 'app-label-text-field',
  templateUrl: './label-text-field.component.html',
  styleUrls: ['./label-text-field.component.scss']
})
export class LabelTextFieldComponent implements OnInit, ControlValueAccessor {

  @ViewChild('input', {static: true}) input?: ElementRef;
  @Input() value?: string;
  @Input() type?: string;
  @Input() id?: string;
  @Input() label: string;
  @Input() placeholder: string;
  @Input() opacify?: boolean;

  isEdited: boolean = false;
  isActive: boolean = true;


  constructor(
    @Self() public controlDir: NgControl
  ) {
    controlDir.valueAccessor = this;
    if (this.value !== undefined) {
      this.opacify = false;
    }
    if (!this.value) {
      this.opacify = true;
    }
  }

  is(o: any) {
    console.log(o);
  }

  ngOnInit() {
    const control = this.controlDir.control;
    const validators = control.validator ? [control.validator] : [];
    const asyncValidators = control.asyncValidator ? [control.asyncValidator] : [];

    control.setValidators(validators);
    control.setAsyncValidators(asyncValidators);
    control.updateValueAndValidity();
  }

  onChange(event) {}
  onTouched() {}

  writeValue(obj: any): void {
    this.input.nativeElement.value  = obj || '';
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  // setDisabledState?(isDisabled: boolean): void {
  //   throw new Error('Method not implemented.');
  // }


}
