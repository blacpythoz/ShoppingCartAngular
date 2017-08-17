import { Component,OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { URLSearchParams, } from '@angular/http';
import { UserService } from '../../services/user.service';




@Component({
	moduleId:module.id,
	template:'HELLO WORLD',
})

export class CallBackComponent{
	redirectUrl: string;
	accessToken:string;
	constructor(public router: Router,private _userService:UserService) {
		this.redirectUrl='login';

	}

	ngOnInit() {
		let params = new URLSearchParams(this.router.url.split('#')[1]);
		this.accessToken=params.get('access_token');

		if(this.accessToken) {
			localStorage.setItem('access_token',JSON.stringify(this.accessToken));
			this._userService.apiGetUserInformation(this.accessToken).subscribe(res=>{
				console.log("userinformation",res);
				localStorage.setItem('user', JSON.stringify(res));
				this.redirectUrl='/';
					console.log("Logged in successfully");
			//login successfully so redirect to return url
			this.router.navigateByUrl(this.redirectUrl);
			})
		
		}

		this.router.navigateByUrl(this.redirectUrl);

	}

}