import { NgModule }      from '@angular/core';
import { LoadingComponent} from './loading.component';
import { BrowserModule } from '@angular/platform-browser';


@NgModule({
  imports: [ BrowserModule ],
  declarations: [ LoadingComponent ],
  bootstrap:    [ LoadingComponent ],
  exports: [LoadingComponent],
})

export class LoadingModule { }
