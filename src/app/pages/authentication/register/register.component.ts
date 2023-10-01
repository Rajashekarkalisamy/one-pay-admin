import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class AppSideRegisterComponent {
  registerFormSubmitted: boolean = false;

  constructor(private router: Router, private commonService: CommonService) { }
  registerForm = new FormGroup({
    email: new FormControl('rajashekarkalisamy@gmail.com', [Validators.required, Validators.pattern("[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}")]),
    password: new FormControl('123456', [Validators.required, Validators.minLength(6)]),
  });

  get rf() {
    return this.registerForm.controls;
  }

  register = () => {
    this.registerFormSubmitted = true;
    if (this.registerForm.valid) {
      let requestData = {
        "email": this.rf.email.value,
        "password": this.rf.password.value
      }
      this.commonService.request("users/create", "POST", requestData).then(() => { }).catch(() => { });
    }
  }
}
