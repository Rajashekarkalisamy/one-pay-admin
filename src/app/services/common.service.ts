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
    private _router: Router
  ) { }

  request = (endPoint: string, type = "GET", data: any = {}) => {
    return new Promise((resolve, reject) => {
      if (type == "GET") {
        this.http.get(environment.apiDomain + endPoint).subscribe((responseBody: any) => {
          console.log(responseBody);
        });
      } else {
        this.http.post(environment.apiDomain + endPoint, data).subscribe((response: any) => {
          console.log(response);
          if (response.success) {
            if (response.type === STATUS['INFORMATION']) {
              this.openToast("info", response.message);
            } else if (response.type === STATUS['WARNING']) {
              this.openToast("warn", response.message);
            } else if (response.type === STATUS['ERROR']) {
              this.openToast("error", response.message);
            } else if (response.type === STATUS['SUCCESS']) {
              this.openToast("success", response.message);
            }
            resolve(response);
          } else {
            this.openToast("error", response.message);
            reject(response);
          }
        });
      }
    });
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
}
