import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
})
export class ForgotPasswordComponent implements OnInit {
  @ViewChild('passwordForm') passwordForm: NgForm;
  buttonDisabled = false;
  buttonState = '';

  constructor(
    private notifications: NotificationsService,
    private router: Router,
    private titleService: Title,
    private authnticationService: AuthenticationService
  ) { }

  ngOnInit() {
    this.titleService.setTitle('Mot de passe oublié | GARK')
  }

  message: string = "";
  onSubmit() {
    if (!this.passwordForm.valid || this.buttonDisabled) {
      return;
    }
    this.buttonDisabled = true;
    this.buttonState = 'show-spinner';

    this.authnticationService.requestPasswordReset(this.passwordForm.value.email).subscribe(
      (res) => {
        this.notifications.create('Succès', "Un email est envoyé à votre boîte de réception", NotificationType.Bare, { theClass: 'outline primary', timeOut: 6000, showProgressBar: false });
        this.buttonState = '';
        this.message = "Un email est envoyé à votre boîte de réception"
      },
      (err) => {
        if (err["status"] == 404) {
          this.notifications.create('Error', err["error"]["message"], NotificationType.Bare, { theClass: 'outline primary', timeOut: 6000, showProgressBar: false });
        } else {
          this.notifications.create('Error', "Une erreur a survenue, veuillez réessayer", NotificationType.Bare, { theClass: 'outline primary', timeOut: 6000, showProgressBar: false });
        }
        this.buttonDisabled = false;
        this.buttonState = '';

      }
    )
  }

}
