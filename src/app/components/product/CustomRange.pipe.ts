import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'CustomRange'})
export class CustomRange implements PipeTransform {
	transform(value:number, args:string[]) : any {
		let res = [];
		if(value <= 5) {
			for (let i = 0; i < value; i++) {
				res.push(i);
			}
		} else {
			for(let i=0;i<5;i++) {
				res.push(i);
			}
		}
		return res;
	}
}
