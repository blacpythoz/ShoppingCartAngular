import {AbstractControl} from '@angular/forms';
export class PasswordValidation {

    static MatchPassword(AC: AbstractControl):boolean {
       let password = AC.get('password').value; // to get value in input tag
       let confirmPassword = AC.get('password_confirmation').value; // to get value in input tag
        if(password != confirmPassword) {
            console.log('false');
            AC.get('password_confirmation').setErrors( {MatchPassword: true} )
        } else {
            console.log('true');
            return null
        }
    }
}