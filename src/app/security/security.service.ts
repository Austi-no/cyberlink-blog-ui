import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SecurityService {



  securityUrl: string = '/cyberLink/v1/user/';
  oauthUrl: string = '/cyberLink/oauth/token'

  constructor(private http: HttpClient) { }




  login(loginData: any): any {

    const body = new HttpParams()
      .set('username', loginData.username)
      .set('password', loginData.password)
      .set('grant_type', 'password');

    const headers = {
      'Authorization': 'Basic ' + btoa(loginData.username + ':' + loginData.password),
      'Content-type': 'application/x-www-form-urlencoded'
    }
    return this.http.post(this.oauthUrl, body, { headers });

  }

  saveUser(data: any): any {
    return this.http.post(this.securityUrl + 'createUser', data);
  }

  getAllUsers(): any {
    return this.http.get(this.securityUrl + '/allUsers');
  }

  authenticateAndGetUserRoles(value: any): any {
    return this.http.post(this.securityUrl + 'authenticateAndGetUserRoles', value);
  }
}
