import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { EventC } from 'src/app/shared/models/event.model';
import { Group } from 'src/app/shared/models/group.model';
import { Terrain } from 'src/app/shared/models/terrain.model';
import { IUser } from 'src/app/shared/models/user.model';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { EventsService } from 'src/app/shared/services/events.service';

@Component({
  selector: 'app-add-reservation',
  templateUrl: './add-reservation.component.html',
  styleUrls: ['./add-reservation.component.scss']
})
export class AddReservationComponent implements OnInit {

  constructor(
    private eventService: EventsService,
    public dialogRef: MatDialogRef<AddReservationComponent>,
    private notificationsService: NotificationsService,
    private authService: AuthenticationService,
    @Inject(MAT_DIALOG_DATA) public data: Object
  ) {

  }

  uniqueTerrain: boolean = false;
  listGroup: Array<Group> = new Array<Group>();
  listCoaches: Array<IUser> = new Array<IUser>();
  nomCoaches: Array<string> = new Array<string>();
  connectedCoach: IUser;
  buttonDisabled = false;
  buttonState = "";
  // monGroup: string = ""
  terrain: Terrain;
  showCoachList = true;
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

    if (this.data["role"] == 'coach'){
      this.authService.getConnectedUser().subscribe((res: any) => {
        console.log(res);
        
      })
    }
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
      coach: this.selectedCoach,
      type: this.resMobile?.type
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
          this.dialogRef.close("refresh")
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
