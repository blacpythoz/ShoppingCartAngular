import { Component,AfterViewInit } from '@angular/core';
import { Product } from '../product/product';
import { UserInfo } from '../product/userInfo';
import { ProductService } from '../../services/product.service';
import {FormGroup } from '@angular/forms';
import {FormControl,Validators } from '@angular/forms';


@Component({
	moduleId:module.id,
	selector:'checkout',
	templateUrl:'checkout.component.html',
})

export class CheckoutComponent {
	carts:any[];
	// for user information while user logged in
	userInfo:UserInfo;

	phoneGroup=new FormGroup({
		phone:new FormControl('',[Validators.required, Validators.minLength(2)]),
		address:new FormControl('',[Validators.required, Validators.minLength(2)]),
	})



	constructor(private _productService:ProductService) {
		this.userInfo = JSON.parse(localStorage.getItem('user'));
		var obj=JSON.parse(localStorage.getItem('carts'));
		// parse json object to array
		if(obj) {
		this.carts = Object.keys(obj).map(function(k) { return obj[k] });
		console.log(this.carts);
		}
		

	}

	checkOut() {
		//console.log(this.addToCartGroup.value.quantity);
		var length = this.carts.length;
		for (var i = 0; i < length; i++) {
			this._productService.addToCart(
				this.carts[i].product_id,
				this.userInfo.id,
				this.carts[i].quantity,
				this.phoneGroup.value.phone,
				this.phoneGroup.value.address,
				).subscribe(res=>{
				console.log(res);
			})
		}
	}

	
	changeFormat(backspace:string) {
		var newVal=this.phoneGroup.value.phone;

		if (backspace=="true") {
			newVal = newVal.substring(0, newVal.length - 1);
		} 

		/**
		// don't show braces for empty value
		if (newVal.length == 0) {
			newVal = '';
		} 
		// don't show braces for empty groups at the end
		else if (newVal.length <= 3) {
			newVal = newVal.replace(/^(\d{0,3})/, '($1)');
		} else if (newVal.length <= 6) {
			newVal = newVal.replace(/^(\d{0,3})(\d{0,3})/, '($1) ($2)');
		} else {
			newVal = newVal.replace(/^(\d{0,3})(\d{0,3})(.*)/, '($1) ($2)-$3');
		}
		**/
		// set the new value
		//console.log(newVal);
		this.phoneGroup.setValue({phone:newVal});
	}

	/**
	using javascript
	ngAfterViewInit()
   {
     document.getElementById('phone').addEventListener('input',    function (e) 
     {

      var x = e.target.value.replace(/\D/g, '').match(/(\d{0,2})(\d{0,7})/);
//      var x = e.target.value.replace(/\D/g, '').match(/(\d{0,2})(\d{0,4})(\d{0,4})/);
      console.log(x);
	// e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');

			//kathmandu landline
      e.target.value = !x[2] ? x[1] : x[1] + ' - ' + x[2];
     });
   }
   **/

}
