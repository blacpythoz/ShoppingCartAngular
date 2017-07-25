import { Component,OnInit  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User  } from './user';
import { UserService  } from '../../services/user.service';
import {FormGroup, FormBuilder,Validators } from '@angular/forms';
import { PasswordValidation } from '../register/passwordValidation';

@Component({
    moduleId:module.id,
    selector:'editUser',
    templateUrl:'editUser.component.html',
})

export class EditUserComponent {
	id:string;
	user:User;
	editUserGroup:FormGroup;
	constructor(private _route:ActivatedRoute,private _userService:UserService,private fb:FormBuilder) {
		// set the localstorage user info into userinfo modal
		//this.userInfo = JSON.parse(localStorage.getItem('user'));
	}

ngOnInit() {
		this.editUserGroup = this.fb.group({
			name: ['', [Validators.required, Validators.minLength(2)]],
			password: ['', [Validators.required, Validators.minLength(2)]],
			email: ['', [Validators.required, Validators.minLength(2)]],
			address: ['', [Validators.required, Validators.minLength(2)]],
			phone: ['', [Validators.required, Validators.minLength(2)]],
			password_confirmation: ['', [Validators.required, Validators.minLength(2)]],
		},{
			validator: PasswordValidation.MatchPassword // your validation method
		});
	
		this._route.params.map(params=>params['id'])
		.subscribe((id)=>{
			this.id=id;
			this._userService.getUser(id).subscribe(res=>{
				this.user=res.user;
				console.log('specififc user',res.user);
			})
		})
	}

	editUser() {
		this._userService.editUser(this.editUserGroup.value).subscribe(res=>{
			console.log(res);
			if(res.messagecode==201) {
				console.log("Created user successfully");
			}
		});
	}

	
}
