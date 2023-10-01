import { Injectable } from '@angular/core';
import { HttpService } from './http/http.service';
import { MatSnackBar, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';
import { StatusCodes } from '../config/index.config';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private http: HttpService, private _snackBar: MatSnackBar) { }

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
            if (StatusCodes['info'].includes(response.statusCode)) {
              this.openToast("info", response.message);
            } else if (StatusCodes['warn'].includes(response.statusCode)) {
              this.openToast("warn", response.message);
            } else if (StatusCodes['error'].includes(response.statusCode)) {
              this.openToast("error", response.message);
            } else {
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

}
