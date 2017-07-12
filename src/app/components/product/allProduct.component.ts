import { Component } from '@angular/core';
import {ProductService } from '../../services/product.service';
import {SearchService } from '../../services/search.service';
import { Product } from './product';
import {FormControl } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';

@Component({
	moduleId:module.id,
	selector:'allproduct',
	templateUrl:'allProduct.component.html',
})

export class AllProductComponent {
	term=new FormControl();
	products:Product[];
	constructor(private _productService:ProductService,private _searchService:SearchService) {
		console.log("Product comonent initialized");
		this._productService.getAllProduct().subscribe(res=>{
			console.log(res);
			this.products=res;
			console.log(this.products);
		})
		this.term.valueChanges
		.debounceTime(400)
		.subscribe(term=>{
			this._searchService.searchProduct(term).subscribe(res=>{
				//console.log(res);
				this.products=res;
			})
		})
	}
	checkLogin() {
		return localStorage.getItem('user');
	}
}