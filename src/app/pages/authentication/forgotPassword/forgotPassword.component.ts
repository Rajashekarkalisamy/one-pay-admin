import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CommonService } from '../../../services/common.service';


@Component({
  selector: 'app-forgotPassword',
  templateUrl: './forgotPassword.component.html',
  styleUrls: ['./forgotPassword.component.scss']
})
export class AppSideforgotPasswordComponent {
  loginFormSubmitted: boolean = false;
  email: string | null = "";

  constructor(private authService: AuthService,private commonService: CommonService) {
    this.loginForm.patchValue({
      email : this.email
    });
  }
  loginForm = new FormGroup({
    email: new FormControl(this.email, [Validators.required, Validators.pattern("[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}")]),
  });

  get lf() {
    return this.loginForm.controls;
  }

  forgotPassword = () => {
    this.loginFormSubmitted = true;
    if (this.loginForm.valid) {
      return new Promise((resolve, reject) => {
        this.commonService.request("users/forgotPassword", "POST", {
          "email": this.lf.email.value,
        }).then((response: any) => {
          console.log(response)
          if (response.success && response.statusCode == "R215") {            
            resolve(true);
          }
        });
      })
    } else {
      return Promise.resolve(false);
    }
  }
}
