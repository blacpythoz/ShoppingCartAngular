import { Component,OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import {FormGroup } from '@angular/forms';
import {FormControl,Validators } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';



@Component({
	moduleId:module.id,
	selector:'login',
	templateUrl:'login.component.html',
})

export class LoginComponent {
	returnUrl: string;

	constructor(private _userService:UserService, private route: ActivatedRoute,private router:Router) {
		console.log("called register component");
	}
	loginGroup=new FormGroup({
		email:new FormControl('',[Validators.required, Validators.minLength(2)]),
		password:new FormControl('',[Validators.required, Validators.minLength(2)]),
	})

   ngOnInit() {
        // get return url from route parameters or default to '/'
        // implemting redirection after user has logged in
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

	loginUser() {
		//console.log(this.loginGroup.value,this.loginGroup.valid);
		this._userService.loginUser(this.loginGroup.value).subscribe(res=>{
			console.log(res);
			if(res.message.messagecode==200) {
				localStorage.setItem('user', JSON.stringify(res.user));
			console.log("Logged in successfully");
	         // login successful so redirect to return url
			    this.router.navigateByUrl(this.returnUrl);

			}
		});
		
	}

}
