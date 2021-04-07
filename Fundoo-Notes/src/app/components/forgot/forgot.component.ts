import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ForgotPassword } from '../../model/ForgotPassword.model';
import { UserService } from '../../service/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss']
})
export class ForgotComponent implements OnInit {

  forgotpassword: ForgotPassword = new ForgotPassword();
  constructor(private userService: UserService, private matSnackBar: MatSnackBar) { }

  ngOnInit(): void {
  }
  emailId = new FormControl(null, [Validators.required, Validators.email]);

  getEmailErrorMessage() {
    return this.emailId.hasError('required') ? "Enter Email Id" :
      this.emailId.hasError('email') ? "EmailId not valid" :
        "";
  }

  onSubmit() {
    this.forgotpassword.emailId = this.emailId.value;
    this.userService.forgetPassword(this.forgotpassword).subscribe(

      (response: any) => {
        this.matSnackBar.open("Check mail for verification", "succesfull", { duration: 5000 })
      },

      (error: any) => {
        this.matSnackBar.open("not found user", "failed", { duration: 5000 })
      }
    );
  }
}
