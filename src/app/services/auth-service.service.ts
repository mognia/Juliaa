import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { HttpModule } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  roles: any;
  authToken: any;
  user: any;

  constructor(private http: Http) {
    // this.isDev = true;
  }
  registerUser(user) {
    console.log(user);

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/register', user, { headers: headers })
      .map(res => res.json());
  }

  authenticateUser(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/authenticate', user, { headers: headers })
      .map(res => res.json());
  }
  forgetPass(email) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/forgotpassword', email, { headers: headers })
      .map(res => res.json());
  }
  updatekyc(form) {


    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    // headers.append('Content-Type', 'multipart/form-data');
    let body = new FormData();
    body.append('email', form.email);
    body.append('firstName', form.firstname);
    body.append('lastName', form.lastname);
    body.append('birthDate', form.birth);
    body.append('telephone', form.phone);
    body.append('walletAddress', form.wallet);
    body.append('address', form.address);
    body.append('passportImage', form.image);

    return this.http.post('http://localhost:3000/users/updatekyc', body, { headers: headers })
      .map(res => res.json());
  }
  verifykyc(form) {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users//verifykyc', form, { headers: headers })
      .map(res => res.json());
  }
  changeRole(form) {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/changeroles', form, { headers: headers })
      .map(res => res.json());
  }
  getProfile() {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/users/profile', { headers: headers })
      .map(res => res.json());
  }
  getReferal() {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/users/getreferal', { headers: headers })
      .map(res => res.json());
  }
  adminKyc() {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/users/verifykyc', { headers: headers })
      .map(res => res.json());
  }

  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('roles', JSON.stringify(user.roles));
    this.authToken = token;
    this.roles = user.roles
    this.user = user;
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }
  loadRole() {
    const roles = localStorage.getItem('roles');
    return roles;
  }
  getUserList(){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/users/list', { headers: headers })
      .map(res => res.json());
  }

  resetPasswor(form){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/changepassword', form, { headers: headers })
      .map(res => res.json());
  }
  ForgetResetPass(form){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/resetpassword', form, { headers: headers })
      .map(res => res.json());
  }

  loggedIn() {
    return tokenNotExpired('id_token');
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}
