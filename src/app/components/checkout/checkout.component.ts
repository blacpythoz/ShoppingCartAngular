import { Component,AfterViewInit } from '@angular/core';
import { Product } from '../product/product';
import { UserInfo } from '../product/userInfo';
import { ProductService } from '../../services/product.service';
import {FormGroup } from '@angular/forms';
import {FormControl,Validators } from '@angular/forms';
import { Cart } from './cart';


@Component({
	moduleId:module.id,
	selector:'checkout',
	templateUrl:'checkout.component.html',
})

export class CheckoutComponent {
	carts:any[];

	// store the remotes preorders
	remotePreCarts=new Array();

	// check if there is any thing in remote carts
	remotePreCart:boolean=false;

	// for user information while user logged in
	userInfo:UserInfo;

	phoneGroup=new FormGroup({
		phone:new FormControl('',[Validators.required, Validators.minLength(2)]),
		address:new FormControl('',[Validators.required, Validators.minLength(2)]),
	})

	constructor(private _productService:ProductService) {

		// retrive user info and existing local carts info
		this.userInfo = JSON.parse(localStorage.getItem('user'))
		var obj=JSON.parse(localStorage.getItem('carts'));
		// parse json object to array // this is of local storage
		if(obj) {
			this.carts = Object.keys(obj).map(function(k) { return obj[k] });
			
			// getting information from the database
			_productService.getPreOrder(this.userInfo.id).subscribe(res=>{
				for (var i = 0; i < res.data.length; i++) {
					var cart= new Cart;
					cart.name=res.data[i].product.name;
					cart.product_id=res.data[i].product.id;
					cart.quantity="1";
					cart.image=res.data[i].product.medias[0].path;
					cart.brand=res.data[i].product.brand;
					cart.price=res.data[i].product.discountPrice;
					cart.date=res.data[i].created_at;
					this.remotePreCarts[i]=cart;
				}
				if(this.remotePreCarts.length>0) {
					this.remotePreCart=false;
					$('#myModal').modal('show');
				}

			});
		}
	}

	remoteStatus() {	
		return this.remotePreCart && localStorage.getItem('user');
	}

	changeToRemote() {
		this.remotePreCart=true;
		$('#myModal').modal('hide');
	}

	mergeLocalAndRemote() {
		$('#myModal').modal('hide');
	}

	// this methods checkouts the user based on the user choice for
	// local storage or remote orders.
	checkOut() {
		var orderCarts;
		if(this.remotePreCart) {
			orderCarts=this.remotePreCarts;
		} else {
			orderCarts=this.carts;
		}
		var length=orderCarts.length;
		for (var i = 0; i < length; i++) {
			this._productService.addToCart(
				orderCarts[i].product_id,
				this.userInfo.id,
				orderCarts[i].quantity,
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
			this.phoneGroup.setValue({phone:newVal});
		}
	}
