import { NgModule }      from '@angular/core';
import { DatePickerComponent } from './datepicker.component';
import { BrowserModule } from '@angular/platform-browser';


@NgModule({
  imports: [ BrowserModule ],
  declarations: [ DatePickerComponent ],
  bootstrap:    [ DatePickerComponent ],
  exports: [DatePickerComponent],
})

export class DatePickerModule { }
