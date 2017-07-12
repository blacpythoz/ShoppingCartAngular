import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()

export class SearchService {
	searchUrl:string;
	constructor(private _http:Http) {
		console.log("Search service initailized");
	}

	searchProduct(term:string) {
		//var headers=new Headers();
		//headers.append
		//this.searchUrl='http://local.dev/api/user/search?keyword='+term;
		this.searchUrl='http://local.dev/api/user/search?term='+term;
		console.log(this.searchUrl);
		return this._http.get(this.searchUrl).map(res=>res.json());
	}
}