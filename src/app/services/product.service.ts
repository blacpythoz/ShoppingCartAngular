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
	getProduct(id:string) {
		return this._http.get('http://local.dev/api/product/'+id).map(res=>res.json());
	}
	addToCart(pid:string,uid:string,quantity:string) {
		var body={
			'product_id':pid,
			'user_id':uid,
			'quantity':quantity,
		};
		return this._http.post('http://local.dev/api/user/order',body).map(res=>res.json());
	}
}