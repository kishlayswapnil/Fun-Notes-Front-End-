import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
  }
  firstname = new FormControl(null, [Validators.required , Validators.pattern('[a-zA-Z]{3,20}')]);
  lastname = new FormControl(null, [Validators.required , Validators.pattern('[a-zA-Z]{3,20}')]);
  username = new FormControl(null, [Validators.required , Validators.pattern('[a-zA-Z]{3,20}')]);
  mobileNumber = new FormControl(null, [Validators.required, Validators.pattern('^[1-9]{1}[0-9]{9}$')]);
  email = new FormControl(null, [Validators.required, Validators.email]);
  password= new FormControl(null, [Validators.required, Validators.pattern('[a-zA-Z0-9@#$%&]{8,20}')]);
  hide = true;

  getFirstNameErrorMessage(){
    return this.firstname.hasError('required')? "Enter name":
    this.firstname.hasError('pattern')?"Name required minimum 3 character":
     "";
  }

  getLastNameErrorMessage(){
    return this.lastname.hasError('required')? "Enter name":
    this.lastname.hasError('pattern')?"Name required minimum 3 character":
     "";
  }

  getUserNameErrorMessage(){
    return this.username.hasError('required')? "Enter user name":
    this.username.hasError('pattern')?"Name required minimum 3 character":
     "";
  }

  getPhoneNoErrorMessage(){
    return this.mobileNumber.hasError('required')? "Enter PhoneNo":
    this.mobileNumber.hasError('pattern')? "PhoneNo not valid":
     "";
  }

  getEmailErrorMessage(){
    return this.email.hasError('required')? "Enter Email Id":
    this.email.hasError('email')? "EmailId not valid":
     "";
  }

  getPasswordErrorMessage(){
    return this.password.hasError('required')? "Enter Password":
    this.password.hasError('pattern')? "minimum 8 characters required":
     "";
  }
}
