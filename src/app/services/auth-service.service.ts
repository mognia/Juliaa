import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { HttpModule } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';
import { JwtHelperService } from '@auth0/angular-jwt';
const helper = new JwtHelperService();
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  roles: any;
  authToken: any;
  user: any;

  constructor(private http: HttpClient) {
    // this.isDev = true;
  }
  registerUser(user) {
    console.log(user);

    let headers = new   HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post('/users/register', user, { headers: headers })
      // .map(res => res.json());
  }

  authenticateUser(user) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post('/users/authenticate', user, { headers: headers })
      // .map(res => res.json());
  }
  forgetPass(email) {
    let headers = new   HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post('/users/forgotpassword', email, { headers: headers })
      // .map(res => res.json());
  }
  updatekyc(form) {


    let headers = new HttpHeaders({
      'Authorization' : this.authToken
    });
    this.loadToken();
    headers.append('Authorization', this.authToken);
    // headers.append('Content-Type', 'multipart/form-data');
    let body = new FormData();
    // body.append('email', form.email);
    body.append('firstName', form.firstname);
    body.append('lastName', form.lastname);
    body.append('birthDate', form.birth);
    body.append('telephone', form.phone);
    body.append('walletAddress', form.wallet);
    body.append('address', form.address);
    body.append('passportImage', form.image);

    return this.http.post('/users/updatekyc', body, { headers: headers })
      // .map(res => res.json());
  }
  verifykyc(form) {
    let headers = new HttpHeaders({
      'Authorization' : this.authToken
    });
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.post('/users/verifykyc', form, { headers: headers })
      // .map(res => res.json());
  }
  changeRole(form) {
    let headers = new HttpHeaders({
      'Authorization' : this.authToken
    });
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.post('/users/changeroles', form, { headers: headers })
      // .map(res => res.json());
  }
  getProfile() {
    let headers = new HttpHeaders({
      'Authorization' : this.authToken
    });
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('/users/profile', { headers: headers })
      // .map(res => res.json());
  }
  getReferal() {
    let headers = new HttpHeaders({
      'Authorization' : this.authToken
    });
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('/users/getreferal', { headers: headers })
      // .map(res => res.json());
  }
  adminKyc() {
    let headers = new HttpHeaders({
      'Authorization' : this.authToken
    });
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('/users/verifykyc', { headers: headers })
      // .map(res => res.json());
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
    let headers = new HttpHeaders({
      'Authorization' : this.authToken
    });
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('/users/listroles', { headers: headers })
    .map(result => result);
  }
  getUserListKyc(){
    let headers = new HttpHeaders({
      'Authorization' : this.authToken
    });
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('/users/listkyc', { headers: headers })
      // .map(res => res.json());
  }

  getKyc(email){
    let headers = new HttpHeaders({
      'Authorization' : this.authToken
    });
    this.loadToken();
    headers.append('Content-Type', 'application/json');
    return this.http.post('/users/get-kyc', email ,{ headers: headers })
      // .map(res => res.json());
  }
  resetPasswor(form){
    let headers = new HttpHeaders({
      'Authorization' : this.authToken
    });
    headers.append('Content-Type', 'application/json');
    return this.http.post('/users/changepassword', form, { headers: headers })
      // .map(res => res.json());
  }
  ForgetResetPass(form){
    let headers = new HttpHeaders({
      'Authorization' : this.authToken
    });;
    headers.append('Content-Type', 'application/json');
    return this.http.post('/users/resetpassword', form, { headers: headers })
      // .map(res => res.json());
  }

  loggedIn() {
    // return tokenNotExpired('id_token');
    const token = localStorage.getItem('id_token');
    
    return helper.isTokenExpired(token);
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  signContract(type){
    this.loadToken();
    let headers = new HttpHeaders({       'Authorization' : this.authToken     });

    return this.http.post('/users/sign-contract',type, { headers: headers })
    // .map(result => result);
  }

  activeUser(email){

    this.loadToken();
    let headers = new HttpHeaders({       'Authorization' : this.authToken     });

    return this.http.post('/users/enable',email, { headers: headers })
  }
  deactiveUser(email){

    
    this.loadToken();
    let headers = new HttpHeaders({       'Authorization' : this.authToken     });

    return this.http.post('/users/disable',email, { headers: headers })
  }
}