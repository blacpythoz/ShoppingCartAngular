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
    
     // simple login user or old login system before implementing api logins
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

    //api password login with passport as backend
    apiLoginUser(username:string,password:string) {
        console.log('password',password);
        console.log('username',username);
        var body = {
            'grant_type':'password',
            'client_id':'2',
            'client_secret':'NwUYE9StA0S58s7068DFAdejY9pJOuo9McenmiV5',
            'username':username,
            'password':password,
        };        
         // let token = document.querySelector('meta[property="csrf-token"]')['content'];
         // let headers = new Headers({ 'Content-Type': 'application/json', 'X-CSRF-TOKEN': token});

           return this._http.post('http://local.dev/oauth/token',body).map(res=>res.json());
        //return this._http.post('http://pass.dev/oauth/token',body).map(res=>res.json());
    }

    apiGetUserInformation(token:string) {
         let headers = new Headers({ 'Authorization': 'Bearer '+token});
           return this._http.get('http://local.dev/api/user',{headers:headers}).map(res=>res.json());
    }




}
