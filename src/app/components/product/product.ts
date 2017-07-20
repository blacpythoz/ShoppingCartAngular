import { Media } from './media';

class Feature {
	id:string;
	size:string;
	color:string;
	weight:string;
}

export class Product {
	created_at:string;
	discountPrice:string;
	id:string;
	image_path:string;
	name:string;
	information:string;
	description:string;
	brand:string;
	price:string;
	updated_at:string;
	medias:Media[];
	feature:Feature;
	quantity:string;
	//feature:Feature;
}