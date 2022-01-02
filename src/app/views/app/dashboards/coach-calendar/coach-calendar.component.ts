import { Component, HostListener, OnChanges, OnInit, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DayService, DragAndDropService, EventRenderedArgs, EventSettingsModel, MonthService, ResizeService, ScheduleComponent, TimeScaleModel, WeekService, WorkWeekService } from '@syncfusion/ej2-angular-schedule';
import { Terrain } from 'src/app/shared/models/terrain.model';
import { Reservation } from 'src/app/shared/models/reservation.model';
import { TerrainService } from 'src/app/shared/services/terrain.service';
import { ReservationService } from 'src/app/shared/services/reservation.service';
import { extend } from '@syncfusion/ej2-base';
import { CalendarComponent } from '@syncfusion/ej2-angular-calendars';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { loadCldr, L10n } from '@syncfusion/ej2-base';
import * as numberingSystems from 'cldr-data/supplemental/numberingSystems.json';
import * as gregorian from 'cldr-data/main/fr-CH/ca-gregorian.json';
import * as numbers from 'cldr-data/main/fr-CH/numbers.json';
import * as timeZoneNames from 'cldr-data/main/fr-CH/timeZoneNames.json';
import { environment } from 'src/environments/environment';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ImageDialogComponent } from '../../boutique/show-terrain/image-dialog/image-dialog.component';
import { Title } from '@angular/platform-browser';
import * as moment from 'moment';
import { EventsService } from 'src/app/shared/services/events.service';
import { addMinutes } from 'date-fns';
import { GroupsService } from 'src/app/shared/services/groups.service';
import { Group } from 'src/app/shared/models/group.model';
import { EventC } from 'src/app/shared/models/event.model';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { EvaluationComponent } from './evaluation/evaluation.component';
import { StopDialogComponent } from '../../ejs-calendar/stop-dialog/stop-dialog.component';
import { AddCoachEventComponent } from '../../terrain/add-coach-event/add-coach-event.component';
import { AcademyService } from 'src/app/shared/services/academy.service';
import { Academy } from 'src/app/shared/models/academy.model';
import { EventCalendarService } from 'src/app/shared/services/eventCalendar.service';
// Angular CLI 8.0 and above versions
loadCldr(numberingSystems['default'], gregorian['default'], numbers['default'], timeZoneNames['default']);

L10n.load({
  'fr-CH': {
    'schedule': {
      'day': 'journée',
      'week': 'semaine',
      'workWeek': 'Semaine de travail',
      'month': 'Mois',
      'today': 'Aujourd`hui',
      "saveButton": "Sauvgarder",
      "cancelButton": "Annuler",
      "deleteButton": "Supprimer",
      "newEvent": "Nouvelle réseration",
      "editEvent": "Modifier réservation",
      "deleteContent": "Vous êtes sure de vouloir supprimer cette réservation?",
      "deleteEvent": "Supprimer réservation?",
      "cancel": "Annuler",
      "delete": "Supprimer",
    },
    'calendar': {
      'today': 'Aujourd`hui'
    },
  }
});
@Component({
  selector: 'app-coach-calendar',
  templateUrl: './coach-calendar.component.html',
  providers: [DayService, WeekService, WorkWeekService, MonthService, { provide: BsDropdownConfig, useValue: { isAnimated: true, autoClose: true } }],
  styleUrls: ['./coach-calendar.component.scss']
})
export class CoachCalendarComponent implements OnInit {

  @ViewChild('calendar') public calendar: CalendarComponent;
  @ViewChild('scheduleObj') public scheduleObj: ScheduleComponent;

  constructor(
    private eventCalendar: EventCalendarService,
    private groupService: GroupsService,
    private academyService: AcademyService,
    private eventService: EventsService,
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private reservationService: ReservationService,
    private notifications: NotificationsService,
    private titleService: Title,
    private _auth: AuthenticationService,
    private router: Router,
    public AddReservationDialog: MatDialog
  ) { }
  ngOnChanges(changes: SimpleChanges): void {
    // //console.log(this.resMobile);

  }

  colors = ['#d50103', '#e77b73', '#f6bf25', '#32b679', '#098043', '#059be5', '#4050b5', '#7986cb', '#8e24aa', '#616161'];

  selectedAcademy;
  isMobile: boolean = false;
  reservataionModal: BsModalRef;
  backend = environment.backend;
  terrainId: string;
  terrain: Terrain;
  isLoading: boolean = true;
  ListGroup: Group[] = new Array<Group>();
  nomGroup: Array<String>;
  terrainSelected;
  reservationList: Array<any> = new Array<any>();
  buttonDisabled = false;
  buttonState = "";
  selectedGroup: Group;
  listAcademiesByCoach: Academy[] = new Array<Academy>();
  image: string;

  resMobile = {
    Name: "",
    group: "",
    StartTime: new Date(new Date().setMinutes(0)),
    EndTime: new Date().addMinutes(90)
  }
  academyId: string;
  isNumber: (args: { [key: string]: string }) => boolean = (args: { [key: string]: string }) => {
    return !isNaN(Number(args['value']));
  };

  public eventSettings: EventSettingsModel = { dataSource: 
    <Object[]>extend([], null, null, true) };
  public showQuickInfo: boolean = false;
  public statusFields: Object = { text: 'Name', value: 'Name' };

  endTime: Date;
  startTime: Date;
  terrainsColors: Array<any> = new Array<any>();
  ngOnInit(): void {    
    this.academyId = this.activatedRoute.snapshot.paramMap.get('id');
    this.image = "assets/imgs/GarkBanner2.png";
    this.titleService.setTitle("Mon Agenda | GARK");
    this.isLoading = false;

    this.academyService.getAcademyById(this.academyId).subscribe((res: any) => {
      this.selectedAcademy = res;
    })

    this._auth.getConnectedUser().subscribe((u: any) =>{

    this.academyService.getAcademiesByCoachId(u.user?._id).subscribe((res: Academy[]) => {
        this.listAcademiesByCoach = res;
        console.log(res);
          
      },
      (err) => { },
      () => {
        this.isLoading = false;
      }
    );


    this.groupService.getGroupsByCoachId(u.user?._id).subscribe((res: Group[]) => {
      this.ListGroup = res;
      this.selectedGroup = res[0];
      console.log(res);
        
    },
    (err) => { },
    () => {
      this.isLoading = false;
    }
  );


    });
    this.fetchData();
  }

  currentViewMode = "Week";
  fetchData() {
    this._auth.getConnectedUser().subscribe((u: any) =>{
      this.eventService.getEventByCoach(u.user._id).subscribe((res) => {              
        this.reservationList = res as EventC[];
        this.reservationList = this.reservationList?.map((el: EventC) => {         
          return el;
        })
  
        this.isLoading = false
  
        if (window.screen.width < 815) {
          this.isMobile = true;
          this.currentViewMode = "Week";        
          try {
            (<HTMLElement>document.getElementById('_nav')).style.display = "none";
            (<HTMLElement>document.querySelector(".e-toolbar-right")).style.display = "none";
          } catch (e) {
            try {
              (<HTMLElement>document.querySelector(".e-toolbar-right")).style.display = "none";
              setTimeout(() => {
                (<HTMLElement>document.getElementById('_nav')).style.display = "none";
              }, 200)
            } catch (e) {
              setTimeout(() => {
                try {
                  (<HTMLElement>document.getElementById('_nav')).style.display = "none";
                } catch (ec) { }
                try {
                  (<HTMLElement>document.querySelector(".e-toolbar-right")).style.display = "none";
                } catch (ee) { }
              }, 200)
            }
          }
        }
        let scheduleData: Object[] = [];
    this.groupService.getAllGroupByAcademyId(this.academyId).subscribe((res) => {
        let groups = res as Group[];
        for (let index = 0; index < this.reservationList.length; index++) {
          scheduleData.push({
            Id: this.reservationList[index]._id,
            Subject: this.reservationList[index].name,
            StartTime: new Date(this.reservationList[index].startTime),
            EndTime: addMinutes(new Date(this.reservationList[index].startTime),90),
            Group: this.reservationList[index].groupe,
            Color: groups.find(g => g._id == this.reservationList[index]?.groupe)?.color
        });
        }
        this.eventSettings = { dataSource: <Object[]>extend([], scheduleData, null, true) };        
      });
      });
    });
    
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {

    if (window.screen.width < 815) {
      this.isMobile = true;
      this.currentViewMode = "Day";
      setTimeout(() => {
        (<HTMLElement>document.getElementById('_nav')).style.display = "none";
        (<HTMLElement>document.querySelector(".e-toolbar-right")).style.display = "none";
      }, 20)
    }
  }

  openAddReservationMobile(event,template?: TemplateRef<any>) {

    // (<HTMLElement>document.querySelector('#reservForm')).style.display = "none";
    // (<HTMLElement>document.querySelector('#fixedbutton')).style.display = "none";
    // (<HTMLElement>document.querySelector('#add-new-reservation')).style.display = "block";
    // this.resMobile.Name = "";
    // // this.resMobile.num = "";
    // this.resMobile.StartTime = new Date(new Date().setHours(new Date().getHours() + 1, 0));
    // this.resMobile.EndTime = new Date(new Date().setHours(new Date().getHours() + 2, 0));
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
    const dialog = this.dialog.open(AddCoachEventComponent, {
      width: '500px',
      data: { multiple: true, groupes: this.ListGroup,role: 'coach',event: event.data}
    });

    dialog.afterClosed().subscribe((res) => {
      if (res) {
        this.fetchData();
      }
    })
  }

  closeModal(template?: TemplateRef<any>) {
    //this.reservataionModal.hide()
    // (<HTMLElement>document.querySelector('#reservForm')).style.display = "block";
    // (<HTMLElement>document.querySelector('#fixedbutton')).style.display = "block";
    // (<HTMLElement>document.querySelector('#add-new-reservation')).style.display = "none";
  }


  public selectedDate: Object = new Date();

  deposit() {
    this.selectedDate = this.calendar.value;
  }

  openDialog(type: string) {
    console.log("test");
    
    const dialogRef = this.dialog.open(ImageDialogComponent, {
      width: '800px',
      data: { data: { type, id: this.terrain._id, image: this.terrain.image || "" } }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.terrain = result as Terrain;
        if (this.terrain.image.indexOf('assets/') == -1) {
          this.image = `${this.backend}images/terrains/${this.terrain.image}`;
        } else {
          this.image = this.terrain.image;
        }
      }
    });
  }

  addReservationDialog(event) {
    const dialog = this.dialog.open(AddCoachEventComponent, {
      width: '500px',
      data: { multiple: true, names: this.nomGroup, list: this.ListGroup, event: event.data }
    });

    dialog.afterClosed().subscribe((res) => {
      if (res) {
        this.fetchData();
      }
    })
  }

  public timeScale: TimeScaleModel = { enable: true, interval: 60, slotCount: 1 };
  public dateParser(data: string) {
    return new Date(data);
  }


  pickColor() {
    let i = Math.floor(Math.random() * this.colors.length);
      return this.colors[i];
  }

  public onEventRendered(args: EventRenderedArgs): void {
    (args.element as HTMLElement).style.backgroundColor = args.data?.Color?.toString();
  }


  notAllowed(event,message) {
    
    const dialogRef = this.dialog.open(StopDialogComponent, {
      width: '100vw',
      data: { multiple: true,list: this.ListGroup, update: true,event: event.data,
        msg:  message}
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  onPopupOpen(event) { 
    console.log(event);
    
    if (this.isMobile && event.type == 'Editor'){
      if (!event.target.classList.contains('e-appointment')){
        if(event.data.StartTime > new Date()){
          this.openAddReservationMobile(event);
        }else {
          this.notAllowed(event,"Cette date a été dépassé, vous ne pouvez pas créer un évenement");
        }
        event.cancel = true;
        return null;
      }else {

      }
    }else if ( this.isMobile && event.type == 'ViewEventInfo'){
      this.selectedGroup = this.reservationList.find(g => g.groupe == event["data"].Group);
      this.openEdit(event);
      event.cancel = true;
      return null;
    }

    if (event.type == 'QuickInfo' && event.target.classList.contains('e-appointment')) {
      if(event.data.StartTime < new Date()){
        this.selectedGroup = this.reservationList.find(g => g.groupe == event["data"].Group);

        this.openEdit(event);
        event.cancel = true;
        return null;
      }else {
        this.notAllowed(event,"Vous ne pouvez pas evaluer cet évènement");

     }   
  }

  if (event.type == 'QuickInfo' && !event.target.classList.contains('e-appointment')){
    if(event.data.StartTime > new Date()){
      // this.openEdit(event);
      if(this.isMobile){
        this.openAddReservationMobile(event);
      } else {
        this.addReservationDialog(event);
      }
    }else {
      this.notAllowed(event,"Cette date a été dépassé, vous ne pouvez pas créer un évenement");
    }
    event.cancel = true;
    return null;
  }

  if (event.type === 'Editor' || event.type === 'ViewEventInfo')  {

    if(event.data.StartTime < new Date()){
      // this.openEdit(event);
      event.cancel = true;
    }else {
      this.notAllowed(event,"Vous ne pouvez pas évaluer cet évènement");
    }
    event.cancel = true;
    return null;
  }
  }
  public onActionBegin(args: { [key: string]: Object }): void {
    console.log(args);
    
    if (args.requestType === 'eventCreate' || args.requestType === 'eventChange' || args.requestType === 'eventRemove') {
      let data: any;
      if (args.requestType === 'eventCreate') {

        let reservation = {
          Name: (<any>args.data[0])["Name"],
          num: (<any>args.data[0])["num"],
          frais: (<any>args.data[0])["frais"],
          StartTime: (<any>args.data[0])["StartTime"] as Date,
          EndTime: (<any>args.data[0])["EndTime"] as Date,
          terrain: (<any>args.data[0])["terrain"],
        } as Reservation;

        this.reservationService.create(reservation).subscribe(
          (res) => {
            this.notifications.create('Succès', "Réservation ajoutée avec succès", NotificationType.Bare, { theClass: 'outline primary', timeOut: 6000, showProgressBar: false });
            data = <any>args.data[0];
            if (this.reservationList.length == 0) {
              this.reservationList = new Array<EventC>();
            }
            let myReservation = res["reservation"] as EventC;
            this.reservationList.push(myReservation);


            let last = (this.eventSettings.dataSource as Array<any>).length;
            (this.eventSettings.dataSource as Array<any>)[last - 1]["_id"] = myReservation._id;
            (this.eventSettings.dataSource as Array<any>)[last - 1]["Subject"] = (this.eventSettings.dataSource as Array<any>)[last - 1]["Name"] || (this.eventSettings.dataSource as Array<any>)[last - 1]["name"] + "<br/>" + (this.eventSettings.dataSource as Array<any>)[last - 1]["num"];
            (this.eventSettings.dataSource as Array<any>)[last - 1]["terrain"] = null;
            // (this.eventSettings.dataSource as Array<any>)[last - 1]["terrain"] = myReservation.terrain

            this.scheduleObj.eventSettings = this.eventSettings;
            // this.scheduleObj.refreshLayout;
            this.scheduleObj.refresh();

          },
          (err) => {
            this.notifications.create('Erreur', "Une erreur a survenue lors de l'ajour", NotificationType.Bare, { theClass: 'outline primary', timeOut: 6000, showProgressBar: false });
          }
        )

      } else if (args.requestType === 'eventChange') {
        data = <any>args.data;
        console.log(data);
        console.log(this.resMobile);
        
        // this.resMobile.Name = (<any>args.data)["Subject"]
        // this.resMobile.StartTime = (<any>args.data)["StartTime"]
        // this.resMobile.EndTime = (<any>args.data)["EndTime"]
             
        let reservation = {
          name: this.resMobile.Name,
          startTime: this.resMobile.StartTime as Date,
          endTime: this.resMobile.EndTime as Date,
          groupe: this.selectedGroup,
          _id: (<any>args.data)["Id"],
        } as EventC;
        console.log(reservation );
        
        this.eventService.editEvent(reservation._id, reservation).subscribe((res) => {
          let updatedRecord = res as EventC;
          console.log(res);
          
          this.reservationList = this.reservationList.filter((el) => {
            if (el["_id"] == updatedRecord["_id"]) {
              el = updatedRecord;
              console.log(el);
              
            }
            return el;
          });

          (this.eventSettings.dataSource as Array<any>) = (this.eventSettings.dataSource as Array<any>).filter((el) => {
            console.log(el);
            console.log(reservation);
            
            if (el["Id"] == reservation["_id"]) {
              console.log("ok");
              
              el["EndTime"] = reservation.endTime;
              el["StartTime"] = reservation.startTime;
              el["Subject"] = reservation["name"];
              // if (el["terrain"] instanceof Object) {
              //   el["terrain"]["name"] = updatedRecord.terrain["name"];
              // } else {
              //   el["terrain"] = updatedRecord.terrain["name"];
              // }
            }
            return el;
          })

          this.notifications.create('Succès', "Réservation mis à jour avec succès", NotificationType.Bare, { theClass: 'outline primary', timeOut: 6000, showProgressBar: false });
          this.scheduleObj.eventSettings = this.eventSettings;
          // this.scheduleObj.refreshLayout;
          this.scheduleObj.refresh();
        },
          (err) => {
            this.notifications.create('Erreur', "Une erreur a survenue lors de la mise à jour de la réseravtion", NotificationType.Bare, { theClass: 'outline primary', timeOut: 6000, showProgressBar: false });
          }
        )
      } else if (args.requestType === 'eventRemove') {
        console.log(args);
        
        let id = args.deletedRecords[0]["Id"];
        console.log(id);
        

        this.eventService.deleteEvent(id).subscribe((res) => {
          (this.eventSettings.dataSource as Array<any>) = (this.eventSettings.dataSource as Array<any>).filter((el) => {
            return el["_id"] != id;
          })
          this.notifications.create('Succès', "Réservation suprimée avec succès", NotificationType.Bare, { theClass: 'outline primary', timeOut: 6000, showProgressBar: false });
          this.fetchData();
        },
          (err) => {
            this.notifications.error('Erreur', "Une erreur a survenue lors de la suppression de la réseravtion",  {  timeOut: 6000, showProgressBar: false });
          });
        // this.scheduleObj.eventSettings = this.eventSettings;
        // this.scheduleObj.refreshLayout;
        // this.scheduleObj.refresh();

      }
      // if (!this.scheduleObj.isSlotAvailable(data.StartTime as Date, data.EndTime as Date) && args.requestType !== 'eventRemove') {
      //   args.cancel = true;
      // }
    }
  }

  openEdit(event) {
    this.eventService.emitData(event.data);
    this.eventCalendar.emitData(event.data);
    this.router.navigateByUrl(`/football/app/dashboards/coach-review/${event.data["Id"]}`);
    // const dialogRef = this.dialog.open(EvaluationComponent, {
    //   width: '500px',height:'60%',
    //   data: { multiple: true, group: this.selectedGroup,list: this.ListGroup, update: true,event: event.data }
    // });

    // dialogRef.afterClosed().subscribe(result => {

    // });
  }

  
  groupHasChanged(event) {
    console.log(event["value"]);
    this.already = false;
    const selectedStaduim = event["value"];
    this.selectedGroup = this.ListGroup.find((t: Group) => {
      return selectedStaduim == t.name;
    });
  }
  
  startTimeHasChanged(event) {
    console.log(event);
    
    this.already = false;
    this.resMobile.StartTime = event as Date;
    this.resMobile.EndTime = this.resMobile.StartTime.addMinutes(90);
  }
  TerrainChanged(event) {
    let name = event["itemData"]["value"];
    this.notSelected = false;
    // this.terrain = this.ListTerrain.find((t: Terrain) => {
    //   return t.name === name;
    // });
    this.resMobile.EndTime = this.resMobile.StartTime.addMinutes(this.terrain.duration)
  }

  showSelectedAcademy(academy){
    console.log(academy);
    this.groupService.getAllGroupByAcademyId(academy?._id).subscribe((res) => {  
        this.ListGroup = res as Group[];
        this.nomGroup = this.ListGroup.map((el: Group) => {
          return el.name;
        });
      });
    this.academyService.getAcademyById(academy?._id).subscribe((res: Academy) => {
      this.selectedAcademy = res;
      console.log(this.selectedAcademy);
      
    });
    // this.fetchData(academy?._id);
  }


  showSelectedGroup(group){
    console.log(group);    
  }

  validateNumber() {
    const regex = /\s/gi;
    // let a = this.resMobile.num;
    // a = a.replace(regex, '');
    // return !isNaN(+a) && a.length == 8;
  }
  already: boolean = false;
  notSelected: boolean = false;
  onSubmit() {
    if (this.resMobile.group == "") {
      this.notSelected = true;
    }
    if (this.buttonDisabled || this.resMobile.Name == "" || this.resMobile.StartTime == null || this.resMobile.EndTime == null) {
      return;
    }
    this.notSelected = false;
    this.buttonDisabled = true;
    this.buttonState = 'show-spinner';

    this.reservationService.create(this.resMobile).subscribe((res) => {

      if (res["error"] == true) {
        this.already = true;
        this.buttonDisabled = false;
        this.buttonState = "";
      } else {
        this.notifications.create('Succès', "Réservation ajoutée avec succès", NotificationType.Bare, { theClass: 'outline primary', timeOut: 3000, showProgressBar: false });
        this.fetchData();
        this.buttonDisabled = false;
        this.buttonState = "";

        (<HTMLElement>document.querySelector('#add-new-reservation')).style.display = "none";
        (<HTMLElement>document.querySelector('#main')).style.display = "block";
        (<HTMLElement>document.querySelector('#fixedbutton')).style.display = "block";
      }
    },
    (err)=>{
      this.notifications.error('Erreur', "Une erreur a survenue", { timeOut: 3000, showProgressBar: false });
    })
  }

  

  public format = 'dd/MM/yyyy HH:mm';

  getStartTime(event) {
    // const d = event as Date;
    this.already = false;
    this.resMobile.StartTime = event as Date;
    // if (this.resMobile.terrain) {
    //   this.resMobile.EndTime = this.resMobile.StartTime.addMinutes(this.terrain.duration);
    // } else {
    //   this.resMobile.EndTime = this.resMobile.StartTime.addMinutes(90);
    // }
  }

  StartChangedTime(event) {
    // const d = event as Date;   
    // if(this.resMobile.terrain){
    //   this.data.StartTime = d.addMinutes(this.terrain.duration);
    // }else{
    //   this.resMobile.EndTime = d.addMinutes(90);
    // }
  }


}

declare global {
  interface Date {
    addHours?: (hours: number) => Date;
    addMinutes?: (minutes: number) => Date;
  }
}

Date.prototype.addHours = function (hours: number): Date {
  if (!hours) return this;
  let date = this;
  date = moment(date).add(hours, 'hours').toDate();
  return date;
}

Date.prototype.addMinutes = function (minutes: number): Date {
  if (!minutes) return this;
  let date = this;
  date = moment(date).add(minutes, 'minutes').toDate();
  return date;

}
