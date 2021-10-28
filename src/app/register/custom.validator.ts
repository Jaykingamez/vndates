// validate whether the passwords are equal
import { FormControl, FormGroup } from '@angular/forms';
export function passwordMatchValidator(pwSet: FormGroup) {
    var register_password = pwSet.controls.register_password.value;
    var register_confirm_password = pwSet.controls.register_confirm_password.value;
    if (!(register_password === register_confirm_password)) return { 'notmatch': true };
    return null;
}