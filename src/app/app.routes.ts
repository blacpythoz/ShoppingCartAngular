import { Routes } from '@angular/router';
import { AllProductComponent } from './components/product/allProduct.component';
import { HomeComponent } from './components/home/home.component';
import { SingleProductComponent } from './components/product/singleProduct.component';
import { OrderProductComponent } from './components/product/orderProduct.component';
import { LoginComponent } from './components/login/login.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './guards/auth.guard';
import { LoggedInGuard } from './guards/loggedIn.guard';

export const routes:Routes= [
	{path:'',component:HomeComponent},
	{path:'products',component:AllProductComponent},
	{path:'product/:id',component:SingleProductComponent},
	{path:'login',component:LoginComponent, canActivate:[LoggedInGuard]},
	{path:'checkout',component:CheckoutComponent, canActivate:[AuthGuard]},
	{path:'register',component:RegisterComponent, canActivate:[LoggedInGuard]},
	{path:'order/:id',component:OrderProductComponent,canActivate: [AuthGuard]},
]