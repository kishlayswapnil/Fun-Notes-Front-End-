import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Users } from '../model/User.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  user: Users = new Users();
  constructor(private userService: UserService, private router: Router, private matSnackBar: MatSnackBar) { }

  ngOnInit(): void {
  }
  firstName = new FormControl(null, [Validators.required, Validators.pattern('[a-zA-Z]{3,20}')]);
  lastName = new FormControl(null, [Validators.required, Validators.pattern('[a-zA-Z]{3,20}')]);
  userName = new FormControl(null, [Validators.required, Validators.pattern('[a-zA-Z]{3,20}')]);
  mobileNumber = new FormControl(null, [Validators.required, Validators.pattern('^[1-9]{1}[0-9]{9}$')]);
  emailId = new FormControl(null, [Validators.required, Validators.email]);
  password = new FormControl(null, [Validators.required, Validators.pattern('[a-zA-Z0-9@#$%&]{8,20}')]);
  confirmPassword = new FormControl(null, [Validators.required, Validators.pattern('[a-zA-Z0-9@#$%&]{8,20}')]);
  hide = true;

  getFirstNameErrorMessage() {
    return this.firstName.hasError('required') ? "Enter name" :
      this.firstName.hasError('pattern') ? "Name required minimum 3 character" :
        "";
  }

  getLastNameErrorMessage() {
    return this.lastName.hasError('required') ? "Enter name" :
      this.lastName.hasError('pattern') ? "Name required minimum 3 character" :
        "";
  }

  getUserNameErrorMessage() {
    return this.userName.hasError('required') ? "Enter user name" :
      this.userName.hasError('pattern') ? "Name required minimum 3 character" :
        "";
  }

  getPhoneNoErrorMessage() {
    return this.mobileNumber.hasError('required') ? "Enter PhoneNo" :
      this.mobileNumber.hasError('pattern') ? "PhoneNo not valid" :
        "";
  }

  getEmailErrorMessage() {
    return this.emailId.hasError('required') ? "Enter Email Id" :
      this.emailId.hasError('email') ? "EmailId not valid" :
        "";
  }

  getPasswordErrorMessage() {
    return this.password.hasError('required') ? "Enter Password" :
      this.password.hasError('pattern') ? "minimum 8 characters required" :
        "";
  }

  getConfirmPasswordErrorMessage() {
    return this.password.hasError('required') ? "Enter Password" :
      this.password.hasError('pattern') ? "minimum 8 characters required" :
        "";
  }

  onSubmit() {
    if (this.password.value === this.confirmPassword.value) {

      this.user.firstName = this.firstName.value;
      this.user.lastName = this.lastName.value;
      this.user.userName = this.userName.value;
      this.user.emailId = this.emailId.value;
      this.user.password = this.password.value;
      this.user.mobileNumber = this.mobileNumber.value;
      this.userService.register(this.user).subscribe(
        (response: any) => {
          this.matSnackBar.open(" Check mail for verification", "Registration Succesfull", { duration: 5000 })
          this.router.navigate(["/login"]);
        },
        (error: any) => {
          this.matSnackBar.open("Registration Failed", "failed", { duration: 5000 })
        }
      );
    } else {
      this.matSnackBar.open("Password Mismatched", "failed", { duration: 5000 })
    }

  }
}
