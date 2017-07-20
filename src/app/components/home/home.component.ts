import { Component } from '@angular/core';
import {ProductService } from '../../services/product.service';
import {SearchService } from '../../services/search.service';
import { Product } from '../product/product';
import { Media } from '../product/media';

import {FormControl } from '@angular/forms';
import {FormGroup } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';

@Component({
	moduleId:module.id,
	selector:'home',
	templateUrl:'home.component.html',
})

export class HomeComponent {
	term=new FormControl();
	products:Product[];
	featureImages:Media[];
	constructor(private _productService:ProductService,private _searchService:SearchService) {
		console.log("Product comonent initialized");
		this._productService.getAllProduct().subscribe(res=>{
			this.products=res.product;
			// add the values of the object into the array
			var obj=res.featureImage;
			this.featureImages = Object.keys(obj).map(function(k) { return obj[k] });
			console.log(this.featureImages);
		})
	}

	searchGroup=new FormGroup({
		fromDate:new FormControl(),
		toDate:new FormControl(),
		fromPrice:new FormControl(),
		toPrice:new FormControl(),
		term:new FormControl(),
	})

	searchProduct() {
		this._searchService.searchProduct(this.searchGroup.value).subscribe(res=>{

			this.products=res.data;
			console.log(res.data);
		});
	}

	checkLogin() {
		return localStorage.getItem('user');
	}
}