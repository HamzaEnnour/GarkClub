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
  selector: 'app-edit-event-dialog',
  templateUrl: './edit-event-dialog.component.html',
  styleUrls: ['./edit-event-dialog.component.scss']
})
export class EditEventDialogComponent implements OnInit {

  constructor(
    private eventService: EventsService,
    public dialogRef: MatDialogRef<EditEventDialogComponent>,
    private notificationsService: NotificationsService,
    private reservationService: ReservationService,
    @Inject(MAT_DIALOG_DATA) public data: Object
  ) {

  }

  uniqueTerrain: boolean = false;
  monGroup: Array<any> = new Array<any>();
  listGroup: Array<Terrain> = new Array<Terrain>();
  listCoaches: Array<IUser> = new Array<IUser>();
  nomCoaches: Array<string> = new Array<string>();
  buttonDisabled = false;
  buttonState = "";
  selectedGroup: Group;
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

    if (!this.data["multiple"]) {
      this.uniqueTerrain = true;
      this.resMobile.group = this.data["names"];
    } else {
      this.monGroup = this.data["names"] as Array<any>;
      this.listGroup = this.data["list"] as Array<Terrain>;
      this.listCoaches = this.data["coaches"] as Array<IUser>;
      if (this.data["update"]) {
        this.resMobile.Name = this.data["event"].Subject;
        this.resMobile.group = this.data["list"].find(g => g._id == this.data["event"].Group).name;
        this.selectedGroup = this.data["list"].find(g => g._id == this.data["event"].Group);
        this.resMobile.StartTime = this.data["event"].StartTime;
        this.resMobile.EndTime = this.data["event"].EndTime;
        this.resMobile.type = this.data["event"]?.type;
      }
      // console.log(this.listGroup);
    }
    // console.log(this.monGroup);
    // console.log(this.listGroup);
    // console.log(this.listCoaches);
    this.nomCoaches = this?.listCoaches?.map(c => `${c.firstName} ${c.lastName}`);
    
  }

  already: boolean = false;
  onSubmit() {

    if (this.buttonDisabled || this.resMobile.Name == "" || this.resMobile.StartTime == null || this.resMobile.EndTime == null) {
      return;
    }
    let event: EventC = {
      _id: this.data["event"].Id,
      name: this.resMobile.Name,
      startTime: this.resMobile.StartTime,
      endTime: this.resMobile.EndTime,
      groupe: this.selectedGroup,
      coach: this.selectedCoach
    }
    
    console.log(event);
    this.buttonDisabled = true;
    this.buttonState = 'show-spinner';
    this.eventService.editEvent(event._id, event).subscribe((res) => {

      console.log(res)
      if (res["error"] == true) {
        this.already = true;
        this.buttonDisabled = false;
        this.buttonState = "";
      } else {
        this.notificationsService.create('Succès', "Evenement modifié avec succès", NotificationType.Bare, { theClass: 'outline primary', timeOut: 6000, showProgressBar: false });
        this.already = false;
        this.buttonDisabled = false;
        this.buttonState = "";
        setTimeout(() => {
          this.dialogRef.close(res)
        }, 600)
      }
    });
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
