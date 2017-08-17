import { Component } from '@angular/core';

@Component({
	moduleId:module.id,
	selector:'navbar',
	templateUrl:'navbar.component.html',
})

export class NavbarComponent {
	//get checkLogin(): any {
	checkLogin() {
		return localStorage.getItem('user');
	}
	logout() {
		localStorage.removeItem('user');
		localStorage.removeItem('carts');
		localStorage.removeItem('access_token');
	}
}


