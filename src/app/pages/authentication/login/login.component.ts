import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class AppSideLoginComponent {
  loginFormSubmitted: boolean = false;

  constructor(private commonService: CommonService, private authService: AuthService) { }
  loginForm = new FormGroup({
    email: new FormControl('rajashekarkalisamy@gmail.com', [Validators.required, Validators.pattern("[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}")]),
    password: new FormControl('Raja@101', [Validators.required, Validators.minLength(6)]),
  });

  get lf() {
    return this.loginForm.controls;
  }

  login = () => {
    this.loginFormSubmitted = true;
    if (this.loginForm.valid) {
      let requestData = {
        "email": this.lf.email.value,
        "password": this.lf.password.value
      }
      this.authService.login(requestData);
    }
  }
}
