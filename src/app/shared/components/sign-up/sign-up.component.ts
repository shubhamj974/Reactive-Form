import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SpaceBarValidation } from '../../validation/spaceBar.validation';
import { COUNTRIES_META_DATA } from '../../const/country';
import { CustomRegex } from '../../const/validation';
import { EmployeeValidId } from '../../validation/empId';
import { Iaddress } from '../../models/address';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  public signUp!: FormGroup;
  public genderInfo: string[] = ['Male', 'Female', 'Other'];
  public countryArr: Array<any> = COUNTRIES_META_DATA;
  public currentData!: Iaddress;
  constructor() {}

  ngOnInit(): void {
    this.signUpForm();
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
        sameaddressCheck: new FormControl(false),
      }),
      currentAddress: new FormGroup({
        address2: new FormControl(null),
        country2: new FormControl(null),
        state2: new FormControl(null),
        city2: new FormControl(null),
        zipCode2: new FormControl(null),
      }),
    });
  }

  get f() {
    return this.signUp.controls;
  }

  onSignUp() {
    let data = this.signUp.value;
    this.signUp.reset();
  }

  onCheck() {
    this.currentData = this.signUp.value.permanentaddress;
    const keyToRemove = 'sameaddressCheck';
    const { [keyToRemove]: removedKey, ...newObject } = this.currentData;

    let obj = {
      currentAddress: {
        address2: newObject.address1,
        country2: newObject.country,
        state2: newObject.state,
        city2: newObject.city,
        zipCode2: newObject.zipCode,
      },
    };

    if (this.currentData.sameaddressCheck) {
      this.signUp.patchValue(obj);
    } else {
      this.signUp.patchValue({
        currentAddress: {
          address2: '',
          country2: '',
          state2: '',
          city2: '',
          zipCode2: '',
        },
      });
    }
  }
}
