import { Injectable } from '@angular/core';
import { CommonService } from '../common.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn: boolean = false;
  private userRole: string = '';
  public authToken: string = '';

  constructor(private commonService: CommonService) { }

  login(data: object) {
    this.commonService.request("users/login", "POST", data).then((response: any) => {
      if (response.success) {
        if (response.statusCode == "R200" && response.data && response.data.jwt) {
          this.authToken = response.data.jwt;
          this.loggedIn = true
          this.userRole = response.data.role;
          this.commonService.redirect('/dashboard')
        }
      }
      // console.log(response)
    }).catch((error) => { });
  }

  logout(): void {
    this.loggedIn = false;
    this.userRole = '';
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  getUserRole(): string {
    return this.userRole;
  }

  loginCheck() {
    if (!this.loggedIn) {
      this.commonService.redirect('/authentication/login')
    }
  }
}
