import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss']
})
export class ResetComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  password= new FormControl(null,[Validators.required,Validators.pattern('[a-zA-Z0-9@#$%&]{8,20}')]);
  hide=true;

  getPasswordErrorMessage(){
    return this.password.hasError('required')? "Enter Password":
    this.password.hasError('pattern')? "minimum 8 characters required":
     "";
  }
}
