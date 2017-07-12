import { Component } from '@angular/core';
import {FormGroup } from '@angular/forms';
import {FormControl,Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
	moduleId:module.id,
	selector:'register',
	templateUrl:'register.component.html',
})

export class RegisterComponent {
	constructor(private _userService:UserService) {
		console.log("called register component");
	}
	registerGroup=new FormGroup({
		name:new FormControl(),
		password:new FormControl(),
		email:new FormControl(),
		phone:new FormControl(),
		address:new FormControl(),
		password_confirmation:new FormControl(),
	})

	registerUser() {
		this._userService.registerUser(this.registerGroup.value).subscribe(res=>{
			console.log(res);
			if(res.messagecode==201) {
				console.log("Created user successfully");
			}
		});
	}

}