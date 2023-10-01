import { AbstractControl, ValidationErrors } from '@angular/forms';

export class SpaceBarValidation {
  static spaceBar(controls: AbstractControl): null | ValidationErrors {
    let val = controls.value;
    if (val) {
      if (val.includes(' ')) {
        return { spacBarError: `Space bar is not allowed` };
      } else {
        return null;
      }
    } else {
      return null;
    }
  }
}
