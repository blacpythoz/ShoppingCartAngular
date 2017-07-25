import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { RegisterUser } from '../components/register/registerUser';
import { LoginUser } from '../components/login/loginUser';
import { User } from '../components/user/user';


@Injectable()

export class UserService {
    registerUrl:string;
    loginUrl:string;
    updateUrl:string;
    constructor(private _http:Http) {
        console.log("Userservice initiated");
    }

    registerUser(user:LoginUser) {
        this.registerUrl='http://local.dev/api/register';
        console.log("Called function register user");
        return this._http.post(this.registerUrl,user).map(res=>res.json());
    }

    loginUser(user:RegisterUser) {
        this.loginUrl='http://local.dev/api/login';
        console.log("Called function login user");
        return this._http.post(this.loginUrl,user).map(res=>res.json());
    }
    getUser(id:string) {
        return this._http.get('http://local.dev/api/user/'+id).map(res=>res.json());
    }

    editUser(user:User) {
        this.updateUrl='http://local.dev/user/update';
        console.log("Called function update user");
        return this._http.post(this.updateUrl,user).map(res=>res.json());


    }



}
