import { Component, OnInit, ViewChild } from '@angular/core';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { IRegisterCredentails, User } from 'src/app/shared/models/user.model';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { Academy } from 'src/app/shared/models/academy.model';
import { TerrainService } from 'src/app/shared/services/terrain.service';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-add-academy',
  templateUrl: './add-academy.component.html',
  styleUrls: ['./add-academy.component.scss']
})
export class AddAcademyComponent implements OnInit {

  @ViewChild('registerForm') registerForm: NgForm;
  buttonDisabled = false;
  buttonState = '';
  buttonComplexeDisabled : boolean = false;
  buttonComplexeState: string = '';
  emailModel: string = "";
  passwordModel: string = "";
  confirmPasswordModel: string = "";
  firstNameModel: string = "";
  lastNameModel: string = "";
  telephoneModel: string = "";
  addressModel: string = "";
  genderCombobox: string[] = ["Male", "Female"];
  genderModel: string = "";
  errorMessage: string = "";
  userCredentials: IRegisterCredentails = {
    email: "",
    password: "",
    confirmPassword : "",
    firstName: "",
    lastName: ""
  }
  academy: Academy = new Academy();
  step: number = 0;
  duplicated: boolean = false;
  user :User;

  constructor(
    private _auth: AuthenticationService,
    private notifications: NotificationsService,
    private terrainService: TerrainService,
    private titleService: Title,
    private router: Router
    ) { }

  ready = false;

  ngOnInit() {
    this.titleService.setTitle('Inscription | GARK')  ;
    this.genderModel = this.genderCombobox[0];

    this.academy.name = "";
    this.academy.address = "";
    this.academy.opening = "";
    this.academy.closing = "";
  }

  
  onSubmit() {
    if (!this.registerForm.valid || this.buttonDisabled) {
      return;
    }
    this.buttonDisabled = true;
    this.buttonState = 'show-spinner';

    // this.notifications.create('Erreur', "Veuillez contacter l'administrateur pour vous créer un compte", NotificationType.Bare, { theClass: 'outline primary', timeOut: 6000, showProgressBar: false });
    this.userCredentials.email = this.emailModel;
    this.userCredentials.password = this.passwordModel;
    this.userCredentials.confirmPassword = this.confirmPasswordModel;
    this.userCredentials.firstName = this.firstNameModel;
    this.userCredentials.lastName = this.lastNameModel;

    this._auth.register(this.userCredentials).subscribe(
      (res) => {
        console.log(res);
        
        if (res["created"] == false) {
          this.duplicated = true;
          this.buttonDisabled = false;
          this.buttonState = '';
          this.passwordModel = '';
        } else {
          this.duplicated = false;
          this.step = 2;
          this.ready = true;
          this.user = res["user"] as User;
          
          this.titleService.setTitle('Créer votre complexe')
        }
      },
      (err) => {        
          this.notifications.create('Erreur', "Une erreur a survenue, veuillez réessayer", NotificationType.Bare, { theClass: 'outline primary', timeOut: 6000, showProgressBar: false });
          this.buttonDisabled = false;
          this.buttonState = '';
          this.errorMessage = err.error.message;
          
          
      })
  }


  

  registerComplexe() {

    let opening = this.formatDate(this.academy.opening)
    let closing = this.formatDate(this.academy.closing)
    this.academy.opening = opening;
    this.academy.closing = closing;
    this.buttonComplexeDisabled = true;
    this.buttonComplexeState = 'show-spinner';

    
    this.terrainService.createComplexe(this.academy, this.user._id).subscribe(
      (res) => {
        this.buttonComplexeDisabled = false;
        this.buttonComplexeState = '';
        this.notifications.create('Succès', "Inscription effectué avec succès", NotificationType.Bare, { theClass: 'outline primary', timeOut: 2000, showProgressBar: false })
        // this.complexe = res["complexe"] as Complexe;
        
        setTimeout(()=>{
          this.router.navigateByUrl('/user/login')
        },2000)

      },
      (err) => {
        // //console.log(err);

        this.buttonComplexeDisabled = false;
        this.buttonComplexeState = '';
        // //console.log(err["error"]["Message"]);

        this.notifications.create('Erreur', err["error"]["Message"] || "Une erreur a survenue, veuillez réessayer", NotificationType.Bare, { theClass: 'outline primary', timeOut: 2000, showProgressBar: false })
      }
    )
  }

  formatDate(datetime) {
    let date = new Date(datetime);

    let hours = date.getHours().toString();
    let minutes = date.getMinutes().toString();

    if (+hours < 10) {
      hours = "0" + hours;
    }
    if (+minutes < 10) {
      minutes = "0" + minutes;
    }

    return hours + 'H' + minutes;

  }

}
