import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { RegisterUser } from '../components/register/registerUser';
import { LoginUser } from '../components/login/loginUser';


@Injectable()

export class UserService {
	registerUrl:string;
	loginUrl:string;
	constructor(private _http:Http) {
		console.log("Userservice initiated");
	}

	registerUser(user:LoginUser) {
		this.registerUrl='http://local.dev/api/user/register';
		console.log("Called function register user");
		return this._http.post(this.registerUrl,user).map(res=>res.json());
	}

	loginUser(user:RegisterUser) {
		this.loginUrl='http://local.dev/api/user/login';
		console.log("Called function login user");
		return this._http.post(this.loginUrl,user).map(res=>res.json());
	}

}