import { Directive,HostListener, ElementRef, Input } from '@angular/core';
import { NgControl } from "@angular/forms";

@Directive({ 
	selector: '[phoneFormat]',
	//host: {
		//	'(keydown.backspace)': 'onInputChange($event.target.value, true)',
		//	'(ngModelChange)': 'onInputChange($event)',
		//}
	})

export class PhoneFormatDirective {

	oldValue:string;

	constructor(private el: ElementRef,private model : NgControl) {
		//el.nativeElement.style.backgroundColor = 'yellow';
	}

	@Input() pattern:string;


	@HostListener('keyup', ['$event','$event.target.value'])
	keyEvent(keyEvent: KeyboardEvent,event:string) {
		//console.log(keyEvent);
		//console.log(value);
		//}
	/** OLD LOGIC 
	//onInputChange(event:string, backspace:string) {
		if(this.oldValue!=event) {
			console.log("old value", this.oldValue);
			console.log("new value", event);

			// donot accept any thing other then digits
			var formattedValue = event.replace(/\D/g, '');

			// delete character if backspace is pressed
			if (keyEvent.code=="Backspace") {
				formattedValue = formattedValue.substring(0, formattedValue.length - 1);
				console.log("backspaced value");
			} 

			// don't show braces for empty value
			if (formattedValue.length == 0) {
				formattedValue = '';
			} 
			// don't show braces for empty groups at the end
			else if (formattedValue.length <= 3) {
				formattedValue = formattedValue.replace(/^(\d{0,3})/, '($1)');
			} else if (formattedValue.length <= 6) {
				formattedValue = formattedValue.replace(/^(\d{0,3})(\d{0,3})/, '($1) ($2)');
			} else {
				formattedValue = formattedValue.replace(/^(\d{0,3})(\d{0,3})(.*)/, '($1) ($2)-$3');
			}

			console.log(formattedValue);
			this.oldValue=formattedValue;
			this.model.control.setValue(formattedValue);
		}
		END OF OLD LOGIC
		**/

		// New Logic for pattern format handling
		if(this.oldValue!=event) {
			//only accept digits
		var text = event.replace(/\D/g, '');
		var pattern=this.pattern || 'xxx-xxx-xxx';
		var formattedValue="";
		var j=0;
		for(var i=0;i<pattern.length;i++) {
			if(j<text.length) {
				if(pattern[i]=='x') {
					formattedValue=formattedValue+text[j];
					j++;
				} else {
					formattedValue=formattedValue+pattern[i];
				}
			}
		}

		this.oldValue=formattedValue;
		this.model.control.setValue(formattedValue);
	//	console.log(formattedValue);
	}
}

}