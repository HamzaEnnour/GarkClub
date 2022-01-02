import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { Academy } from 'src/app/shared/models/academy.model';
import { AcademyManagementComponent } from '../academy-management.component';
import { AcademyService } from '../../../../shared/services/academy.service';

@Component({
  selector: 'app-add-new-academy',
  templateUrl: './add-new-academy.component.html',
  styleUrls: ['./add-new-academy.component.scss']
})
export class AddNewAcademyComponent implements OnInit {

  @ViewChild('createForm') createForm: NgForm;
  hopen: Date;
  hclose: Date;
  buttonDisabled = false;
  buttonState = '';
  selectedColor;
  flag: boolean = true;
  update: boolean = false;
  currentId: string;
  colors = ['#d50103', '#e77b73', '#f6bf25', '#32b679', '#098043', '#059be5', '#4050b5', '#7986cb', '#8e24aa', '#616161'];
  academy: Academy = {
    name: "",
    address: "",
    frais: 0,
    image: "",
    opening: new Date(new Date(new Date().setHours(8)).setMinutes(0)).toString(),
    closing: new Date(new Date(new Date().setHours(20)).setMinutes(0)).toString(),
    color: this.colors[0]
  };

  constructor(
    public dialogRef: MatDialogRef<AcademyManagementComponent>,
    private academyService: AcademyService,
    private notificationsService: NotificationsService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
    
  ngOnInit(): void {
    console.log(this.data);
    this.update = this.data["update"] as boolean;
    if (this.update) {
      this.currentId = this.data["id"];
      this.academy = this.data["academy"] as Academy;
      this.academy = new Academy();
      this.academy.name = this.data.academy.name;
      this.academy.address = this.data.academy.address;
      this.academy.frais = this.data.academy?.frais || 0;
      this.academy.opening = this.data.academy.opening;
      this.hopen = this.inversDate(this.data.academy.opening);
      this.academy.closing = this.data.academy.closing;
      this.hclose = this.inversDate(this.data.academy.closing);
      this.academy.color = this.data.academy.color || this.colors[0];
      this.selectedColor = this.academy.color || this.colors[0];
    } else {
      this.selectedColor = this.colors[0];
      this.academy = new Academy();
      this.academy.image = "assets/imgs/GarkBanner2.png";
      this.hopen = new Date(new Date(new Date().setHours(8)).setMinutes(0));
      this.hclose = new Date(new Date(new Date().setHours(20)).setMinutes(0));
      this.academy.color = this.colors[0];
    }
  }

  choose(color) {
    this.selectedColor = color;
  }

  startTimeHasChanged(event) {
    console.log(event);
    this.academy.closing = (event.addMinutes(120)).toString();
    console.log(this.academy.closing);

  }

  onNoClick(): void {
    this.flag = false;
    this.dialogRef.close();
  }

  onSubmit() {
    if (!this.createForm.valid || this.buttonDisabled) {
      return;
    }

    this.buttonDisabled = true;
    this.buttonState = 'show-spinner';

    let newAcademy: Academy = {
      _id: this?.currentId,
      name: this.academy?.name,
      frais: this.academy?.frais,
      address: this.academy?.address,
      opening: this.formatDate(this.hopen),
      closing: this.formatDate(this.hclose),
      color: this.selectedColor,
      image: 'assets/imgs/GarkBanner2.png'
    };

    if(!this.update){
    this.academyService.createAcademy(newAcademy).subscribe((academy: Academy) =>{
      this.buttonDisabled= false;
      this.buttonState = '';
        this.notificationsService.create('Succès', "Académie ajoutée",NotificationType.Bare, { theClass: 'outline primary', timeOut: 2000, showProgressBar: false })
        this.dialogRef.close(newAcademy);
      },
      (err) => {
        this.buttonDisabled= false;
        this.buttonState = '';
        this.notificationsService.create('Erreur', "Une erreur a survenue veuillez réessayer",NotificationType.Bare, { theClass: 'outline primary', timeOut: 6000, showProgressBar: false })
      });
    } else if (this.update && this.flag){
      this.academyService.editAcademy(this.data.academy._id,newAcademy).subscribe((e: Academy)=>{
        this.buttonDisabled= false;
        this.buttonState = '';
        this.notificationsService.create('Succès', "Académie modifiée",NotificationType.Bare, { theClass: 'outline primary', timeOut: 2000, showProgressBar: false })
        this.dialogRef.close(newAcademy);
      },
      (err) => {
        this.buttonDisabled= false;
        this.buttonState = '';
        this.notificationsService.create('Erreur', "Une erreur a survenue veuillez réessayer",NotificationType.Bare, { theClass: 'outline primary', timeOut: 6000, showProgressBar: false });
      }); 
    }
    this.flag = true;
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

  inversDate(hoursMinutes: string){
    let s: string[] = hoursMinutes.split('H');
    let hours = Number(s[0]);
    let minutes = Number(s[1]);
    let day = new Date().getDay();
    let month = new Date().getMonth();
    let year = new Date().getFullYear();

    return new Date(year,month,day,hours,minutes);
  }
}
