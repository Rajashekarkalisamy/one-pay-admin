import { Injectable } from '@angular/core';
import { HttpService } from './http/http.service';
import { MatSnackBar, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';
import { STATUS } from '../config/index.config';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    private cookieService: CookieService,
    private http: HttpService,
    private _snackBar: MatSnackBar,
    private _router: Router,
  ) { }

  request = (endPoint: string, type = "GET", data: any = {}) => {
    return new Promise((resolve, reject) => {
      if (type == "GET") {
        this.http.get(environment.apiDomain + endPoint).subscribe((response: any) => {
          console.log(response);
          if (response.success) {
            this.showToaster(response.type, response.message);
            resolve(response);
          } else {
            this.openToast("error", response.message);
            reject(response);
          }
        });
      } else {
        this.http.post(environment.apiDomain + endPoint, data).subscribe((response: any) => {
          console.log(response);
          if (response.success) {
            this.showToaster(response.type, response.message);
            resolve(response);
          } else {
            this.openToast("error", response.message);
            reject(response);
          }
        });
      }
    });
  }

  showToaster = (responseType: any, responseMessage: any) => {
    if (responseType === STATUS['INFORMATION']) {
      this.openToast("info", responseMessage);
    } else if (responseType === STATUS['WARNING']) {
      this.openToast("warn", responseMessage);
    } else if (responseType === STATUS['ERROR']) {
      this.openToast("error", responseMessage);
    } else if (responseType === STATUS['SUCCESS']) {
      this.openToast("success", responseMessage);
    }
  }

  openToast = (type: string = "success", message: string, action: any = "Okay!") => {
    let panelClass = ['default-snackbar'];
    if (type == "success") panelClass = ['green-snackbar'];
    if (type == "info") panelClass = ['blue-snackbar'];
    if (type == "warn") panelClass = ['yellow-snackbar'];
    if (type == "error") panelClass = ['red-snackbar'];

    if (message) {
      this._snackBar.open(message, action, {
        panelClass: panelClass,
        verticalPosition: this.verticalPosition,
        duration: 4000,
      });
    }
  }
  redirect(path: string) {
    if (path && this._router.url != path) this._router.navigate([path]);
  }

  setCookie = (key: string, value: any) => {
    if (key && value) this.cookieService.set(key, value);
  }
  getCookie = (key: string) => this.cookieService.get(key);

  clearCookie = (key: string) => this.cookieService.delete(key);

  daydiff = (startDate: Date, endDate: Date) => {
    // Calculate the difference in days using JavaScript Date object
    const timeDifference = endDate.getTime() - startDate.getTime();
    return Math.ceil(timeDifference / (1000 * 3600 * 24)) + 1;
  }
}
