import { NgModule }      from '@angular/core';
import { ToastNotifyComponent } from './toastnotify.component';
import { BrowserModule } from '@angular/platform-browser';


@NgModule({
  imports: [ BrowserModule ],
  declarations: [ ToastNotifyComponent ],
  bootstrap:    [ ToastNotifyComponent ],
  exports: [ToastNotifyComponent],
})

export class ToastNotifyModule { }
