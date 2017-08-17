import { Component,Input,OnChanges } from '@angular/core';

@Component({
	moduleId:module.id,
	selector:'toastnotify',
	templateUrl:'toastnotify.component.html',
})

export class ToastNotifyComponent {
	@Input() message:string;
	@Input() type:string;
	@Input() time:number;
	@Input() display:boolean;

	constructor() {
		// default values
		this.type='success';
		this.display=true;

	}

	ngOnChanges() {
			if(this.message && this.display) {
			this.display=true;
		}
		setTimeout(()=>{
		    this.display=false;
			this.message="";
		},7000);

	}
}