import { Component,OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { URLSearchParams, } from '@angular/http';



@Component({
	moduleId:module.id,
	template:'HELLO WORLD',
})

export class CallBackComponent{
	redirectUrl: string;
	accessToken:string;
	constructor(public router: Router) {

 	 }

   ngOnInit() {
    let params = new URLSearchParams(this.router.url.split('#')[1]);
    this.accessToken=params.get('access_token');

    if(this.accessToken) {
    	this.redirectUrl='/';
    }
	this.router.navigateByUrl(this.redirectUrl);

    }

}