import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { SearchFilter } from './searchFilter';


@Injectable()

export class SearchService {
	searchUrl:string;
	constructor(private _http:Http) {
		console.log("Search service initailized");
	}

	searchProduct(searchFilter:SearchFilter) {
		this.searchUrl='http://local.dev/api/search';
		console.log("Called function search products ");
		return this._http.post(this.searchUrl,searchFilter).map(res=>res.json());
	}
}