import { Component } from '@angular/core';
import { Product } from '../product/product';
import { UserInfo } from '../product/userInfo';
import { ProductService } from '../../services/product.service';


@Component({
	moduleId:module.id,
	selector:'checkout',
	templateUrl:'checkout.component.html',
})

export class CheckoutComponent {
	carts:any[];
	// for user information while user logged in
	userInfo:UserInfo;

	constructor(private _productService:ProductService) {
		this.userInfo = JSON.parse(localStorage.getItem('user'));
		var obj=JSON.parse(localStorage.getItem('carts'));
		// parse json object to array
		this.carts = Object.keys(obj).map(function(k) { return obj[k] });
		console.log(this.carts);
	}

	checkOut() {
		//console.log(this.addToCartGroup.value.quantity);
		var length = this.carts.length;
		for (var i = 0; i < length; i++) {
		this._productService.addToCart(this.carts[i].product_id,this.userInfo.id,this.carts[i].quantity).subscribe(res=>{
			console.log(res);
			})
		}
	}
}