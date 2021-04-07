import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, Validators } from '@angular/forms';
import { Login } from '../../model/Login.model';
import { UserService } from '../../service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  login: Login = new Login();
  constructor(private userService: UserService, private router: Router, private matSnackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  emailId = new FormControl(null, [Validators.required, Validators.email]);
  password = new FormControl(null, [Validators.required, Validators.pattern('[a-zA-Z0-9@#$%&]{8,20}')]);
  hide = true;

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

  onSubmit() {
    this.login.emailId = this.emailId.value;
    this.login.password = this.password.value;
    this.userService.login(this.login).subscribe(
      (response: any) => {

        //Token has been added in the local storage 
        localStorage.setItem('token', response.token);
        localStorage.setItem('email', this.emailId.value);
        this.matSnackBar.open(response.message, "Login Succesfull", { duration: 5000 })
        this.router.navigate(["/dashboard"]);
      },
      (error: any) => {
        this.matSnackBar.open(error.error.message, "Login Failed", { duration: 5000 })

      }
    );

  }
}