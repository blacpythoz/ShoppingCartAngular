import { Routes } from '@angular/router';
import { AllProductComponent } from './components/product/allProduct.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './guards/auth.guard';
import { LoggedInGuard } from './guards/loggedIn.guard';

export const routes:Routes= [
	{path:'',component:AllProductComponent},
	{path:'login',component:LoginComponent, canActivate:[LoggedInGuard]},
	{path:'register',component:RegisterComponent, canActivate:[LoggedInGuard]},
	//{path:'home',component:HomeComponent,canActivate: [AuthGuard]},
]