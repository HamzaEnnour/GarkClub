import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
})
export class ResetPasswordComponent implements OnInit {
  @ViewChild('resetForm') resetForm: NgForm;
  emailModel = 'demo@vien.com';
  passwordModel = 'demovien1122';

  buttonDisabled = false;
  buttonState = '';

  constructor(
    private notifications: NotificationsService,
    private router: Router,
    private route : ActivatedRoute,
    private titleService: Title,
    private authenticationService: AuthenticationService
  ) {}

  isLoading: boolean = true;
  hasExpired: boolean = false;
  message : string = "";

  userId : string = "";
  userName : string = "";

  ngOnInit() {
    this.titleService.setTitle('Réinitilisation de compte | GARK');
  }

  get newPassword(){
    return this.resetForm.control.get('newPassword').value;
  }

  onSubmit() {
    if (!this.resetForm.valid || this.buttonDisabled) {
      return;
    }
    this.buttonDisabled = true;
    this.buttonState = 'show-spinner';

    // //console.log(this.newPassword);
    
    this.route.params.subscribe((params)=>{
      const token = params["token"];
    this.authenticationService.resetPassword(token, this.newPassword).subscribe(
      (res)=>{
        this.notifications.create('Succès', "Mot de passe mis à jour avec succès", NotificationType.Bare, { theClass: 'outline primary', timeOut: 6000, showProgressBar: false });
        // //console.log("res", res);
        this.buttonState = '';
        setTimeout(()=>{
          this.router.navigateByUrl('/user/login');
        },2000)
      },
      (err)=>{
        this.buttonDisabled = true;
        this.buttonState = '';
        this.notifications.create('Erreur', "Une erreur a survenue", NotificationType.Bare, { theClass: 'outline primary', timeOut: 6000, showProgressBar: false });
      }
    );
  });
}
}
