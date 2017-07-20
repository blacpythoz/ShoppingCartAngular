import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {ProductService } from '../../services/product.service';
import 'rxjs/add/operator/debounceTime';
import {FormControl } from '@angular/forms';
import {FormGroup } from '@angular/forms';
import { Product } from './product';



@Component({
	moduleId:module.id,
	selector:'singleproduct',
	templateUrl:'singleProduct.component.html',
})

export class SingleProductComponent {
	id:string;
	product=Product;


	addToCartGroup=new FormGroup({
		quantity:new FormControl(),
	})
	constructor(private _route:ActivatedRoute,private _productService:ProductService) {
		}

	
	ngOnInit() {
		this._route.params.map(params=>params['id'])
		.subscribe((id)=>{
			this.id=id;
			console.log(this.id);
			this._productService.getProduct(id).subscribe(res=>{
				this.product=res.product;
				console.log(res);
			})
		})
	}

	addToCart() {

		// create cart if doesnot exist
		var carts = JSON.parse(localStorage.getItem('carts')) || {};
		
		// date
		   var d = new Date();
		    var curr_date = d.getDate();
		    var curr_month = d.getMonth() + 1; 
		    var curr_year = d.getFullYear();

		  // manually creating the json object and appending to the previous value
		 carts[this.product.id+'']={
		 	"name":this.product.name,
		 	"product_id":this.product.id,
		 	"quantity":this.addToCartGroup.value.quantity,
		 	"image":this.product.medias[0].path,
		 	"brand":this.product.brand,
		 	"price":this.product.discountPrice,
		 	"date":curr_date + "-" + curr_month + "-" + curr_year,

		 };

		 localStorage.setItem('carts', JSON.stringify(carts));
	}
}