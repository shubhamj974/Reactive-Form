import { AbstractControl, ValidationErrors } from '@angular/forms';

export class EmployeeValidId {
  static empValidId(control: AbstractControl): null | ValidationErrors {
    let val = control.value as string;
    if (val) {
      let regxp = /^[a-z]\d{3}$/i;
      let isValid = regxp.test(val);
      return isValid
        ? null
        : { InvalidEmpId: `Emp id start with 1 alphabet and end with 3 digit` };
    } else {
      return null;
    }
  }
}
