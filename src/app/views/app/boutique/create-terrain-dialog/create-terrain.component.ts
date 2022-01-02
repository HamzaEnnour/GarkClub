// import { Component, Inject, OnInit, ViewChild } from '@angular/core';
// import { NgForm } from '@angular/forms';
// import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
// import { Router } from '@angular/router';
// import { NotificationsService, NotificationType } from 'angular2-notifications';
// import { Terrain } from 'src/app/shared/models/terrain.model';
// import { TerrainService } from 'src/app/shared/services/terrain.service';
// import { EventCalendarService } from 'src/app/shared/services/eventCalendar.service';

import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { DateTimeAdapter } from 'ng-pick-datetime';
import { EventC } from 'src/app/shared/models/event.model';
import { Group } from 'src/app/shared/models/group.model';
import { Terrain } from 'src/app/shared/models/terrain.model';
import { IUser } from 'src/app/shared/models/user.model';
import { AcademyService } from 'src/app/shared/services/academy.service';
import { EventsService } from 'src/app/shared/services/events.service';
import { ReservationService } from 'src/app/shared/services/reservation.service';
import { TerrainService } from 'src/app/shared/services/terrain.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
    selector: 'create-terrain',
    templateUrl: 'create-terrain.component.html',
    styleUrls : ['./create-terrain.component.scss']
})
export class CreateTerrainComponent implements OnInit {

  //   @ViewChild('createForm') createForm: NgForm;
  //   buttonDisabled = false;
  //   buttonState = '';
  //   selectedColor;
  //   terrain: Terrain;
  //   update: boolean = false;

  //   uniqueTerrain: boolean = false;
  //   monGroup: Array<any> = new Array<any>();
  //   listGroup: Array<Terrain> = new Array<Terrain>();
  //   already;
  //   // monGroup: string = ""
  //   resMobile = {
  //       Groupe: "",
  //       Coach: "",
  //       StartDate: new Date(new Date().setHours(new Date().getHours() + 1, 0, 0)),
  //       EndDate: new Date(new Date().setHours(new Date().getHours() + 2, 0, 0))
  //   }

  //   colors = ['#d50103' , '#e77b73' , '#f6bf25' , '#32b679' , '#098043' , '#059be5' , '#4050b5' , '#7986cb' , '#8e24aa' , '#616161'];
  //   constructor(
  //     private eventCalendar: EventCalendarService,
  //       private router: Router,
  //       public dialogRef: MatDialogRef<CreateTerrainComponent>,
  //       private terrainService: TerrainService,
  //       private notificationsService: NotificationsService,
  //       @Inject(MAT_DIALOG_DATA) public data: Object) { }
    
  //       id = this.data["group"]._id;
  //   ngOnInit(): void {
  //       this.resMobile.Groupe = this.data["group"].name;
  //       this.resMobile.StartDate = this.data["event"].StartTime;
  //       this.resMobile.EndDate = this.data["event"].EndTime;
  //       this.resMobile.Coach = "coach";
              
  //       this.update = this.data["update"] as boolean;
  //       if(this.update == true){
  //           this.terrain = this.data["terrain"] as Terrain;
  //           // this.selectedColor = this.terrain.color || this.colors[0];
  //       }else{
  //           this.selectedColor = this.colors[0];
  //           this.terrain = new Terrain();
  //           this.terrain.duration = 90;
  //           this.terrain.color = this.selectedColor;
  //       }
  //   }

  //   startTimeHasChanged(event) {
  //       console.log(event);
        
  //       // this.already = false;
  //       // this.resMobile.StartTime = event as Date;
  //       // this.resMobile.EndTime = this.resMobile.StartTime.addMinutes(90);
  //     }

  //   choose(color){
  //       this.selectedColor = color;
  //   }

  //   onSubmit() {
  //     this.eventCalendar.emitData(this.data["event"]);
  //     localStorage.setItem('event',JSON.stringify(this.data["event"]));
  //       this.router.navigateByUrl(`/football/app/dashboards/coach-review/${this.id}`);
  //       this.dialogRef.close();
  //       // this.buttonDisabled = true;
  //       // this.buttonState = 'show-spinner';
  //       // this.terrain.color = this.selectedColor
  //       // if(!this.update){
  //       //     this.terrainService.create(this.terrain).subscribe((res)=>{
  //       //         this.buttonDisabled= false;
  //       //         this.buttonState = '';
  //       //         this.notificationsService.create('Succès', "Terrain créer",NotificationType.Bare, { theClass: 'outline primary', timeOut: 2000, showProgressBar: false })
  //       //         this.dialogRef.close(res);
  //       //     },
  //       //     (err)=>{
  //       //         this.buttonDisabled= false;
  //       //         this.buttonState = '';
  //       //         this.notificationsService.create('Erreur', "Une erreur a survenue veuillez réessayer",NotificationType.Bare, { theClass: 'outline primary', timeOut: 6000, showProgressBar: false })
  //       //     })
  //       // }else{
  //       //     this.terrainService.update(this.terrain, this.terrain._id).subscribe((res)=>{
  //       //         this.buttonDisabled= false;
  //       //         this.buttonState = '';
  //       //         this.notificationsService.create('Succès', "Terrain mis à jour",NotificationType.Bare, { theClass: 'outline primary', timeOut: 2000, showProgressBar: false })
  //       //         this.dialogRef.close(res);
  //       //     },
  //       //     (err)=>{
  //       //         this.buttonDisabled= false;
  //       //         this.buttonState = '';
  //       //         this.notificationsService.create('Erreur', "Une erreur a survenue veuillez réessayer",NotificationType.Bare, { theClass: 'outline primary', timeOut: 6000, showProgressBar: false })
  //       //     })
  //       // }
    
  //   }

   


  //   onNoClick(): void {
  //       this.dialogRef.close();
  //   }


  // addMin(){
  //   this.terrain.duration += 30;
  // }

  // minusMin(){
  //   if(this.terrain.duration >= 90){
  //     this.terrain.duration -= 30;
  //   }
  // }



  constructor(
    private eventService: EventsService,
    public dialogRef: MatDialogRef<CreateTerrainComponent>,
    private notificationsService: NotificationsService,
    private reservationService: ReservationService,
    @Inject(MAT_DIALOG_DATA) public data: Object
  ) {

  }

  uniqueTerrain: boolean = false;
  listGroup: Array<Group> = new Array<Group>();
  listCoaches: Array<IUser> = new Array<IUser>();
  nomCoaches: Array<string> = new Array<string>();
  buttonDisabled = false;
  buttonState = "";
  // monGroup: string = ""
  terrain: Terrain;
  showCoachList = true;
  academyId = localStorage.getItem('academyId');
  typeList: string[] = ['Séance d\'entrainement','Match amical','Match Officiel','Tournoi'];

  resMobile = {
    Name: "",
    num: "",
    group: "",
    coach: "",
    type: "",
    StartTime: new Date(new Date().setHours(new Date().getHours() + 1, 0, 0)),
    EndTime: new Date(new Date().setHours(new Date().getHours() + 2, 0, 0))
  }
  public format = 'dd/MM/yyyy HH:mm';
  ngOnInit(): void {
console.log(this.data);

      this.listGroup = this.data["groupes"] as Array<Group>;
      this.listCoaches = this.data["coaches"] as Array<IUser>;
      if (this.data["update"]) {
        this.resMobile.StartTime = this.data["event"].StartTime;
        this.resMobile.EndTime = this.data["event"].EndTime;
      }

    this.nomCoaches = this?.listCoaches?.map(c => `${c.firstName} ${c.lastName}`);
    
  }

  already: boolean = false;
  onSubmit() {

    if (this.buttonDisabled || this.resMobile.Name == "" || this.resMobile.StartTime == null || this.resMobile.EndTime == null) {
      return;
    }
    let event: EventC = {
      name: this.resMobile.Name,
      startTime: this.resMobile.StartTime,
      endTime: this.resMobile.EndTime,
      groupe: this.selectedGroup,
      coach: this.selectedCoach
    }
    
    console.log(event);
    this.buttonDisabled = true;
    this.buttonState = 'show-spinner';
    this.eventService.createEvent(event,event.groupe._id).subscribe((res) => {

      console.log(res)
      if (res["error"] == true) {
        this.already = true;
        this.buttonDisabled = false;
        this.buttonState = "";
      } else {
        this.notificationsService.create('Succès', "Evenement ajouté avec succès", NotificationType.Bare, { theClass: 'outline primary', timeOut: 6000, showProgressBar: false });
        this.already = false;
        this.buttonDisabled = false;
        this.buttonState = "";
        setTimeout(() => {
          this.dialogRef.close(res)
        }, 600)
      }
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  validateNumber() {
    const regex = /\s/gi;
    let a = this.resMobile.num;
    a = a.replace(regex, '');

    return !isNaN(+a) && a.length == 8;
  }

  selectedGroup: Group;
  groupHasChanged(event) {
    console.log(event?.target?.value);
    this.already = false;
    const selectedStaduim = event?.target?.value;
    this.selectedGroup = this.listGroup.find((t: Group) => {
      return selectedStaduim == t.name;
    });
  }

  selectedCoach: IUser;
  CoachHasChanged(event) {
    console.log(event?.target?.value);
    this.already = false;
    const selectedStaduim = event?.target?.value;
    this.selectedCoach = this.listCoaches.find((t: any) => {
      return selectedStaduim == `${t.firstName} ${t.lastName}`;
    });
  }

  TypehHasChanged(event){

  }

  startTimeHasChanged(event) {
    this.already = false;
    this.resMobile.StartTime = event as Date;
    this.resMobile.EndTime = this.resMobile.StartTime.addMinutes(90);
    // if (this.selectedGroup) {
    //   this.resMobile.EndTime = this.resMobile.StartTime.addMinutes(this.selectedGroup.duration);
    // } else {
    //   this.resMobile.EndTime = this.resMobile.StartTime.addMinutes(90);
    // }
  }
}