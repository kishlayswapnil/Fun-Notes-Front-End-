import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { Users } from '../model/User.model';
import { Login } from '../model/Login.model';
import { ResetPassword } from '../model/ResetPassword.model';
import { ForgotPassword } from '../model/ForgotPassword.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor( private http: HttpClient ) { }
  private  dbUrl = "http://localhost:8080/user/";

  register(data: Users): Observable<any> {
    return this.http.post(this.dbUrl+'registration', data);
  }
  login(data: Login): Observable<any> {
    return this.http.post(this.dbUrl+'login', data);
  }
  forgetPassword(data: ForgotPassword): Observable<any> {
    return this.http.post(this.dbUrl+'forgetPassword', data);
  }
  resetPassword(data: ResetPassword, token: string): Observable<any> {
    return this.http.put(this.dbUrl+'reset/${token}', data);
  }
}
