import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ProductService } from './services/product.service';
import { UserService } from './services/user.service';
import { SearchService } from './services/search.service';
import { AllProductComponent } from './components/product/allProduct.component';

import { HomeComponent } from './components/home/home.component';
import { SingleProductComponent } from './components/product/singleProduct.component';
import { EditUserComponent } from './components/user/editUser.component';
import { OrderProductComponent } from './components/product/orderProduct.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { LoginComponent } from './components/login/login.component';
import { CallBackComponent } from './components/login/callback.component';
import { RegisterComponent } from './components/register/register.component';
import { DatePickerModule } from './components/datepicker/datepicker.module';
import { ToastNotifyModule } from './components/toastnotify/toastnotify.module';

import { LoadingModule } from './components/loading/loading.module';

import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from './guards/auth.guard';

import { PhoneFormatDirective } from './components/checkout/phoneFormat.directive';

import { LoggedInGuard } from './guards/loggedIn.guard';

import { CustomRange } from './components/product/CustomRange.pipe';


//import { CookieService } from 'angular2-cookie/services/cookies.service';

import { ToastNotification } from './components/toastnotify/ToastNotification';
import { AppComponent }  from './app.component';

@NgModule({
  imports:[ 
            BrowserModule,
  					HttpModule,
  					RouterModule.forRoot(routes),
  					FormsModule,
  					ReactiveFormsModule,
            DatePickerModule,
            ToastNotifyModule,
            LoadingModule,
  				],
          
  declarations:[ 
                  AppComponent,
                  HomeComponent,
  					      AllProductComponent,
                  CheckoutComponent,
  				      	NavbarComponent,
  					      OrderProductComponent,
  					      LoginComponent,
  			      		EditUserComponent,
    					    RegisterComponent,
                  CallBackComponent,
                  SingleProductComponent,
                  PhoneFormatDirective,
                  CustomRange,
        				],

  bootstrap:[ 
              AppComponent 
            ],

  providers:[ 
              ProductService,
    					UserService,
    					AuthGuard,
    					LoggedInGuard,
    					SearchService,
              ToastNotification
    			 	],
})
export class AppModule { }
