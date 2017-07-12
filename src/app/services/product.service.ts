import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()

export class ProductService {
	constructor(private _http:Http) {
		console.log("Product service initailized");
	}

	getAllProduct() {
		var headers=new Headers();
		//headers.append
		return this._http.get('http://local.dev/api/product/index').map(res=>res.json());
	}
}