import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { ICredentails } from 'src/app/shared/models/user.model';
import * as CryptoJS from 'crypto-js';
import { CookieService } from 'ngx-cookie';
import {RoleService} from 'src/app/shared/services/role.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  @ViewChild('loginForm') loginForm: NgForm;
  emailModel = '';
  passwordModel = '';

  buttonDisabled: boolean = false;
  buttonState: string = '';
  rememberMe: boolean = false;

  constructor(
    private roleService: RoleService,
    private notifications: NotificationsService,
    private router: Router,
    private _auth: AuthenticationService,
    private cookieService: CookieService
  ) {}

  ngOnInit() {;
    let dataCookie = this.cookieService.get(environment.remember)
    if (dataCookie) {
      this.getUserCredentials(dataCookie);
      this.rememberMe = true;
    }
  }

  userCredentials: ICredentails = {
    email: "",
    password: "",
  }

  onSubmit() {
    if (!this.loginForm.valid || this.buttonDisabled) {
      return;
    }
    this.buttonDisabled = true;
    this.buttonState = 'show-spinner';


    this.userCredentials.email = this.emailModel;
    this.userCredentials.password = this.passwordModel;

    this._auth.logIn(this.userCredentials).subscribe(
      (res: any) => {
        if (res["token"] != undefined) {
          this._auth.saveToken(res["token"]);
          if (this.rememberMe) {
            this.saveUserCredentials();
          }
          localStorage.setItem('role', res.user.role);
          // this.roleService.emitData(res.)
          if(res.user.role == 'owner'){
            this.router.navigateByUrl(`${environment.adminRoot}/clubs`);
          }else if(res.user.role == 'coach'){
            this.router.navigateByUrl(`${environment.adminRoot}/dashboards/coach-clubs`);
          }else if(res.user.role == 'player'){
            this.router.navigateByUrl(`${environment.adminRoot}/dashboards/player`);
          }else if(res.user.role == 'parent'){
            this.router.navigateByUrl(`${environment.adminRoot}/parent`);
          }else {
            this.router.navigateByUrl(`${environment.adminRoot}/compte`);
          }
          
        }
      },
      (err) => {
        //res == { message : "system error" }
        this.buttonDisabled = false;
        this.buttonState = '';
        this.notifications.error('Erreur', err["error"]["message"], {
          timeOut: 3000,
          showProgressBar: true,
          pauseOnHover: true,
          clickToClose: true
        });
      })
  }

  saveUserCredentials() {
    let credentials = { email: this.userCredentials.email, password: this.userCredentials.password };
    const data = btoa(JSON.stringify(credentials));
    let encrypted = this.encryptData(data);
    this.cookieService.put(environment.remember, encrypted);
  }

  getUserCredentials(data) {
    let encrypted = this.decryptData(data);
    let credentials = JSON.parse(atob(encrypted));

    this.userCredentials.email = credentials["email"];
    this.userCredentials.password = credentials["password"];

    this.emailModel = this.userCredentials.email;
    this.passwordModel = this.userCredentials.password;
  }

  encryptData(data) {
    try {
      return CryptoJS.AES.encrypt(JSON.stringify(data), environment.rememberSecret).toString();
    } catch (e) { }
  }

  decryptData(data) {
    try {
      const bytes = CryptoJS.AES.decrypt(data, environment.rememberSecret);
      if (bytes.toString()) {
        return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      }
      return data;
    } catch (e) { }
  }
}
