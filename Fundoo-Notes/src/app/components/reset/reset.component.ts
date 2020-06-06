import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ResetPassword } from '../../model/ResetPassword.model';
import { UserService } from '../../service/user.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss']
})
export class ResetComponent implements OnInit {
  resetpassword: ResetPassword = new ResetPassword();
  constructor(private userService: UserService, private router: Router, private matSnackBar: MatSnackBar) { }

  ngOnInit(): void {
  }
  password = new FormControl(null, [Validators.required, Validators.pattern('[a-zA-Z0-9@#$%&]{8,20}')]);
  confirmPassword = new FormControl(null, [Validators.required, Validators.pattern('[a-zA-Z0-9@#$%&]{8,20}')]);

  hide = true;
  token: string;

  getPasswordErrorMessage() {
    return this.password.hasError('required') ? "Enter Password" :
      this.password.hasError('pattern') ? "minimum 8 characters required" :
        "";
  }
  onSubmit() {
    if (this.password.value === this.confirmPassword.value) {

      this.resetpassword.confirmPassword = this.password.value;
      this.userService.resetPassword(this.resetpassword, this.token).subscribe(

        (response: any) => {
          this.matSnackBar.open("Password has been changed", "Successfully", { duration: 5000 })
          this.router.navigate(["/login"]);
        },

        (error: any) => {
          this.matSnackBar.open("User Not Found", "failed", { duration: 5000 })
        }
      );
    } else {
      this.matSnackBar.open("Password Mismatched", "failed", { duration: 5000 })
    }
  }
}
