import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from './product';
import { Feature } from './feature';
import { UserInfo } from './userInfo';
import {FormControl } from '@angular/forms';
import {FormGroup } from '@angular/forms';


@Component({
	moduleId:module.id,
	selector:'orderproduct',
	templateUrl:'orderProduct.component.html'
})


export class OrderProductComponent {
	id:string;
	// to be continu
	product=new Product();
	feature=new Feature();
	// for user information while user logged in
	userInfo=new UserInfo();


	constructor(private _route:ActivatedRoute,private _productService:ProductService) {
		// set the localstorage user info into userinfo modal
		this.userInfo = JSON.parse(localStorage.getItem('user'));
	}

	addToCartGroup=new FormGroup({
		quantity:new FormControl(),
	})

	ngOnInit() {
		this._route.params.map(params=>params['id'])
		.subscribe((id)=>{
			this.id=id;
			console.log(this.id);
			this._productService.getProduct(id).subscribe(res=>{
				this.product=res.product;
				this.feature=res.feature;
				console.log(this.product);
			})
		})
	}

	addToCart() {
		console.log(this.addToCartGroup.value.quantity);
		this._productService.addToCart(this.product.id,this.userInfo.id,this.addToCartGroup.value.quantity).subscribe(res=>{
			console.log(res);
		})
	}

}
