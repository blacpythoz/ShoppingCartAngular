import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import {FormGroup } from '@angular/forms';
import {FormControl,Validators } from '@angular/forms';
import { Router } from '@angular/router';



@Component({
	moduleId:module.id,
	selector:'login',
	templateUrl:'login.component.html',
})

export class LoginComponent {

	constructor(private _userService:UserService,private router:Router) {
		console.log("called register component");
	}
	loginGroup=new FormGroup({
		email:new FormControl(),
		password:new FormControl(),
	})

	loginUser() {
		this._userService.loginUser(this.loginGroup.value).subscribe(res=>{
			console.log(res);
			if(res.message.messagecode==200) {
				localStorage.setItem('user', JSON.stringify(res.user));
			//var currentUser = JSON.parse(localStorage.getItem('currentUser'));
			//var token = currentUser.token; // your token
			console.log("Logged in successfully");
	        this.router.navigate(['']);

			}
		});
	}

}