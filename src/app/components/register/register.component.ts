import { Component,OnInit } from '@angular/core';
import {FormGroup, FormBuilder,Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { PasswordValidation } from './passwordValidation';



@Component({
	moduleId:module.id,
	selector:'register',
	templateUrl:'register.component.html',
})

export class RegisterComponent {
	registerGroup:FormGroup;
	constructor(private _userService:UserService,private fb:FormBuilder) {
		console.log("called register component");
	}

	ngOnInit() {
		this.registerGroup = this.fb.group({
			name: ['', [Validators.required, Validators.minLength(2)]],
			password: ['', [Validators.required, Validators.minLength(2)]],
			email: ['', [Validators.required, Validators.minLength(2)]],
			address: ['', [Validators.required, Validators.minLength(2)]],
			phone: ['', [Validators.required, Validators.minLength(2)]],
			password_confirmation: ['', [Validators.required, Validators.minLength(2)]],
		},{
			validator: PasswordValidation.MatchPassword // your validation method
		});
	}

	checkError(name:string) {
		return this.registerGroup.get(name).hasError('required') && this.registerGroup.get(name).touched;
	}


	registerUser() {
		this._userService.registerUser(this.registerGroup.value).subscribe(res=>{
			console.log(res);
			if(res.messagecode==201) {
				console.log("Created user successfully");
			}
		});
	}

}