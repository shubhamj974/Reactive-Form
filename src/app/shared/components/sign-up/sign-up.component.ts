import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { SpaceBarValidation } from '../../validation/spaceBar.validation';
import { COUNTRIES_META_DATA } from '../../const/country';
import { CustomRegex } from '../../const/validation';
import { EmployeeValidId } from '../../validation/empId';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  public signUp!: FormGroup;
  public genderInfo: string[] = ['Male', 'Female', 'Other'];
  public countryArr: Array<any> = COUNTRIES_META_DATA;
  public isChecked!: boolean;
  constructor() {}

  ngOnInit(): void {
    this.signUpForm();
    this.isPerAddressSameCurr();
  }

  signUpForm() {
    this.signUp = new FormGroup({
      username: new FormControl(null, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(15),
        SpaceBarValidation.spaceBar,
      ]),
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern(CustomRegex.email),
      ]),
      employeeId: new FormControl(null, [
        Validators.required,
        EmployeeValidId.empValidId,
      ]),
      gender: new FormControl(null),
      password: new FormControl(null, [Validators.required]),
      Confirmpassword: new FormControl(null, [Validators.required]),
      permanentaddress: new FormGroup({
        address1: new FormControl(null),
        country: new FormControl(null),
        state: new FormControl(null),
        city: new FormControl(null),
        zipCode: new FormControl(null),
      }),
      currentAddress: new FormGroup({
        address2: new FormControl(null),
        country2: new FormControl(null),
        state2: new FormControl(null),
        city2: new FormControl(null),
        zipCode2: new FormControl(null),
      }),
      sameaddressCheck: new FormControl(false),
      skills: new FormArray([new FormControl(null, [Validators.required])]),
    });
  }

  get f() {
    return this.signUp.controls;
  }

  onSignUp() {
    if (this.signUp.valid) {
      console.log(this.signUp.value);
      this.enabled();
      this.signUp.reset();
    }
  }

  isPerAddressSameCurr() {
    this.signUp
      .get('sameaddressCheck')
      ?.valueChanges.subscribe((res: boolean) => (this.isChecked = res));
  }

  isCurrrentVal() {
    let perAddress = this.signUp.get('permanentaddress')?.value;
    return {
      currentAddress: {
        address2: perAddress.address1,
        country2: perAddress.country,
        state2: perAddress.state,
        city2: perAddress.city,
        zipCode2: perAddress.zipCode,
      },
    };
  }

  noCurrentVal() {
    return {
      currentAddress: {
        address2: '',
        country2: '',
        state2: '',
        city2: '',
        zipCode2: '',
      },
    };
  }

  disabled() {
    this.signUp.get('currentAddress')?.disable();
  }
  enabled() {
    this.signUp.get('currentAddress')?.enable();
  }

  onCheck() {
    if (this.isChecked) {
      this.signUp.patchValue(this.isCurrrentVal());
      this.disabled();
    } else {
      this.signUp.patchValue(this.noCurrentVal());
      this.enabled();
    }
  }

  get isSkillsArray() {
    return this.signUp.get('skills') as FormArray;
  }

  onAddSkills() {
    let skillsControls = new FormControl(null, [Validators.required]);
    if (this.isSkillsArray.length < 5) {
      this.isSkillsArray.push(skillsControls);
    }
  }

  onRemoveSkills(index: number) {
    this.isSkillsArray.removeAt(index);
  }
}
