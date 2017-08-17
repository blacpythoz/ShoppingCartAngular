import { Component,OnInit,Input,HostListener } from '@angular/core';

@Component({
	moduleId:module.id,
	selector:'datepicker',
	templateUrl:'datepicker.component.html',
})

export class DatePickerComponent {
	@Input() startYear:number;
	@Input() endYear:number;
	@Input() monthFormat:string;
	years:number[];
	months:string[];
	totalDays:number[];
	days:number[];

	constructor() {
		// standard date and month format
		this.months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
		this.totalDays = [31,28,31,30,31,30,31,31,30,31,30,31];
	}

	ngOnInit() {
		this.years=[];
		this.days=[];
		if(this.startYear>this.endYear) {
			this.startYear=this.endYear;
		}
		for(var i=this.endYear;i>=this.startYear;i--) {
			this.years.push(i);
		}

		if(this.monthFormat=="short") {
			console.log("Yo mahina",this.months);
			var tempMonth=[];
			// implement foreach
			for(var i=0;i<this.months.length;i++) {
				tempMonth.push(this.months[i].substring(0,3));
			}
			this.months=tempMonth;
		}
		// calls the default montsh
		this.onMonthChange(1);
	}

	// sets the days when months gets changed
	onMonthChange(index:number) {
		this.days=[];
		for(var i=1;i<=this.totalDays[index-1];i++) {
			this.days.push(i);
		}
	}
	
	onYearChange(index:number) {
		// checks for the leap year
		if((index%400==0 || index%100!=0) && (index%4==0)) {
			this.totalDays[1]=29;
			console.log("Leap year")
		} else {
			this.totalDays[1]=28;
			console.log("Not leap year");
		}
		this.onMonthChange(2);
	}

}