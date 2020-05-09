import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
  }
  email = new FormControl(null,[Validators.required,Validators.email]);
  password= new FormControl(null,[Validators.required,Validators.pattern('[a-zA-Z0-9@#$%&]{8,20}')]);
  hide=true;
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
   onSubmit(){}
}