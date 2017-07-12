import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ProductService } from './services/product.service';
import { UserService } from './services/user.service';
import { SearchService } from './services/search.service';
import { AllProductComponent } from './components/product/allProduct.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from './guards/auth.guard';
import { LoggedInGuard } from './guards/loggedIn.guard';

//import { CookieService } from 'angular2-cookie/services/cookies.service';


import { AppComponent }  from './app.component';

@NgModule({
  imports:      [ BrowserModule,HttpModule,RouterModule.forRoot(routes),FormsModule,ReactiveFormsModule ],
  declarations: [ AppComponent,AllProductComponent,NavbarComponent,LoginComponent,RegisterComponent],
  bootstrap:    [ AppComponent ],
  providers: [ProductService,UserService,AuthGuard,LoggedInGuard,SearchService],
})
export class AppModule { }
