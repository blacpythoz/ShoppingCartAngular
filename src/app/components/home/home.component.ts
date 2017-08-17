import { Component } from '@angular/core';
import {ProductService } from '../../services/product.service';
import {SearchService } from '../../services/search.service';
import { Product } from '../product/product';
import { Media } from '../product/media';
import { Cart } from '../checkout/cart';
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



	addToCart(id:string) {

		// create cart if doesnot exist
		var carts = JSON.parse(localStorage.getItem('carts')) || {};
		
		// find the clicked product from the array of products
		var product=new Product();
		var i, len = this.products.length;
	    for (i = 0; i < len; i++) {
	        if (this.products[i] && this.products[i].hasOwnProperty("id") && this.products[i]["id"]==id) {
	        	product=this.products[i];
	        	console.log(product);
	        }
	    }
		
		// get the current system dates
		   var d = new Date();
		    var curr_date = d.getDate();
		    var curr_month = d.getMonth() + 1; 
		    var curr_year = d.getFullYear();

		 	var cart= new Cart;
		 	cart.name=product.name;
		 	cart.product_id=product.id;
		 	cart.quantity="1";
		 	cart.image=product.medias[0].path;
		 	cart.brand=product.brand;
		 	cart.price=product.discountPrice;
		 	cart.date=curr_date+'-'+curr_month+'-'+curr_year;

		 // old method  before implementing order models
		 // manually creating the json object and appending to the previous value
		 // 		 	carts[product.id+'']={
		 // 	"name":product.name,
		 // 	"product_id":product.id,
		 // 	"quantity":"1",
		 // 	"image":product.medias[0].path,
		 // 	"brand":product.brand,
		 // 	"price":product.discountPrice,
		 // 	"date":curr_date + "-" + curr_month + "-" + curr_year,

		 // };
		 carts[product.id+'']=cart;
		localStorage.setItem('carts', JSON.stringify(carts));
		
		// record the add to database of add to cart information
		if(this.checkLogin()) {
			console.log(" ADDing to cart for the login users");
			var userId=JSON.parse(localStorage.getItem('user')).id;
			this._productService.addToCart(
				product.id,
				userId,
				"1",  // default quantity
				"",
				"",
				"pre").subscribe(res=>{
				console.log(res);
			})
		}
	}
}





