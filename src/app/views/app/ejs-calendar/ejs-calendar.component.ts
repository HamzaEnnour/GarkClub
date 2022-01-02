import { Component, HostListener, OnChanges, OnInit, Renderer2, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DayService, DragAndDropService, EventRenderedArgs, EventSettingsModel, MonthService, ResizeService, ScheduleComponent, TimeScaleModel, WeekService, WorkWeekService } from '@syncfusion/ej2-angular-schedule';
import { Terrain } from 'src/app/shared/models/terrain.model';
import { Reservation } from 'src/app/shared/models/reservation.model';
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
import { CreateTerrainComponent } from '../boutique/create-terrain-dialog/create-terrain.component';
import { ImageDialogComponent } from '../boutique/show-terrain/image-dialog/image-dialog.component';
import { Title } from '@angular/platform-browser';
import { AddReservationComponent } from '../terrain/add-reservation/add-reservation.component';
import * as moment from 'moment';
import { EventsService } from 'src/app/shared/services/events.service';
import { addMinutes } from 'date-fns';
import { GroupsService } from 'src/app/shared/services/groups.service';
import { Group } from 'src/app/shared/models/group.model';
import { EventC } from 'src/app/shared/models/event.model';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';
import { IUser } from 'src/app/shared/models/user.model';
import { AcademyService } from 'src/app/shared/services/academy.service';
import {StopDialogComponent} from './stop-dialog/stop-dialog.component';
import {EditEventDialogComponent} from './edit-event-dialog/edit-event-dialog.component';
import { AddNewAcademyComponent } from '../academy-management/add-new-academy/add-new-academy.component';
import { Academy } from 'src/app/shared/models/academy.model';

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
  selector: 'app-ejs-calendar',
  templateUrl: './ejs-calendar.component.html',
  providers: [DayService, WeekService, WorkWeekService, MonthService, { provide: BsDropdownConfig, useValue: { isAnimated: true, autoClose: true } }],

  styleUrls: ['./ejs-calendar.component.scss'],
})
export class EjsCalendarComponent implements OnInit, OnChanges {
  @ViewChild('calendar') public calendar: CalendarComponent;
  @ViewChild('scheduleObj') public scheduleObj: ScheduleComponent;
  public views: Array<string> = ['TimelineDay', 'Day', 'Week', 'Month', 'Agenda'];
  constructor(
    private groupService: GroupsService,
    private eventService: EventsService,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
    private reservationService: ReservationService,
    private notifications: NotificationsService,
    private titleService: Title,
    private academyService: AcademyService,
    public AddReservationDialog: MatDialog,
  ) { }
  ngOnChanges(changes: SimpleChanges): void {
 
  }

  colors = ['#d50103', '#e77b73', '#f6bf25', '#32b679', '#098043', '#059be5', '#4050b5', '#7986cb', '#8e24aa', '#616161'];
  isMobile: boolean = false;
  reservataionModal: BsModalRef;
  backend = environment.backend;
  terrainId: string;
  terrain: Terrain;
  isLoading: boolean = true;
  ListGroup: Group[] = new Array<Group>();
  ListAcademy: Academy[] = new Array<Academy>();
  listCoaches: IUser[] = new Array<IUser>();
  nomGroup: Array<String>;
  currentAcademy: Academy;
  terrainSelected;
  reservationList: Array<any> = new Array<any>();
  buttonDisabled = false;
  buttonState = "";
  image: string;
  resMobile = {
    Name: "",
    // num: "",
    group: "",
    // frais: "90",
    StartTime: new Date(new Date().setMinutes(0)),
    EndTime: new Date().addMinutes(90)
  }
  // academyId: string = localStorage.getItem('academyId');
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
    this.titleService.setTitle("Evènements | GARK");
    this.isLoading = false;
    this.groupService.getAllGroupByAcademyId(this.academyId).subscribe((res) => {  
      console.log(res);
            
        this.ListGroup = res as Group[];
        this.nomGroup = this.ListGroup.map((el: Group) => {
          return el.name;
        });
      },
      (err) => { },
      () => {
        this.isLoading = false;
        this.fetchData(this.academyId);
      });

      this.academyService.getAllAcademies().subscribe((res: Academy[]) => {
        this.ListAcademy = res as Academy[];
      })

      this.academyService.coachesByAcademy(this.academyId).subscribe((res: IUser[]) => {
        this.listCoaches = res as IUser[];
      })

      this.academyService.getAcademyById(this.academyId).subscribe((res: Academy) => {
        this.currentAcademy = res;
        // this.image = "assets/imgs/GarkBanner2.png";
        this.image = this.currentAcademy?.image ?? "assets/imgs/GarkBanner2.png";
        console.log(this.currentAcademy);
        
      });
      this.fetchData(this.academyId);
  }

  currentViewMode = "Week";
  
  fetchData(academyId) {
    this.eventService.getEventByAcademy(academyId).subscribe((res) => {      
      this.reservationList = res as EventC[];
      this.reservationList = this.reservationList.map((el: EventC) => {         
        return el;
      })

      this.isLoading = false

      if (window.screen.width < 815) {
        this.isMobile = true;
        this.currentViewMode = "Week";        
        try {
          (<HTMLElement>document.getElementById('_nav')).style.display = "none";
          // (<HTMLElement>document.querySelector(".e-toolbar-right")).style.display = "none";
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
                Group: this.reservationList[index]?.groupe,
                Color: groups.find(g => g._id == this.reservationList[index]?.groupe).color
      });
      }
      this.eventSettings = { dataSource: <Object[]>extend([], scheduleData, null, true) };
    });
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {

    if (window.screen.width < 815) {
      this.isMobile = true;
      this.currentViewMode = "Day";
    }
  }

  openAddReservationMobile(template?: TemplateRef<any>) {
    console.log("2");
    const dialog = this.dialog.open(AddReservationComponent, {
      width: '500px',
      data: { groupes: this.ListGroup,coaches: this.listCoaches }
    });

    dialog.afterClosed().subscribe((res) => {
      if (res) {
        this.fetchData(this.academyId);
      }
    })
  }

  closeModal(template?: TemplateRef<any>) {
    //this.reservataionModal.hide()
    (<HTMLElement>document.querySelector('#main')).style.display = "block";
    (<HTMLElement>document.querySelector('#fixedbutton')).style.display = "block";
    (<HTMLElement>document.querySelector('#add-new-reservation')).style.display = "none";
  }


  public selectedDate: Object = new Date();

  deposit() {
    this.selectedDate = this.calendar.value;
  }

  openDialog(type: string) {
    
    const dialogRef = this.dialog.open(ImageDialogComponent, {
      width: '800px',
      data: { data: { type, id: this.academyId, image: this.image || "" } }
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      console.log(result);
      
      this.currentAcademy.image = result?.image;
      this.image = result?.image;
      // if (result) {
      //   this.terrain = result as Terrain;
      //   if (this.terrain.image.indexOf('assets/') == -1) {
      //     this.image = `${this.backend}images/terrains/${this.terrain.image}`;
      //   } else {
      //     this.image = this.terrain.image;
      //   }
      // }
    });
  }

  addReservationDialog() {
    console.log("1");
    
    const dialog = this.dialog.open(AddReservationComponent, {
      width: '500px',
      data: { groupes: this.ListGroup,coaches: this.listCoaches }
    });

    dialog.afterClosed().subscribe((res) => {
      if (res) {
        this.fetchData(this.academyId);
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

  onPopupOpen(event) {

    if (event.type == 'QuickInfo' &&
      event.target.classList.contains('e-appointment')
    ) {
      console.log('QuickInfo222');
      event.cancel = true;
      return null;
    }
  
    if (event.type == 'QuickInfo' &&
    !event.target.classList.contains('e-appointment')){
      if(event.data.StartTime > new Date()){
        this.openEdit(event);
      }else {
        this.notAllowed(event,"Cette date a été dépassé, vous ne pouvez pas créer un évenement");
      }
      event.cancel = true;
      return null;
    }
    if (event.type === 'Editor' || event.type === 'ViewEventInfo')  {
      console.log(event);
      if(event.data.StartTime > new Date()){
        this.editEvent(event)
      }else {
        this.notAllowed(event,"Vous ne pouvez pas modifier cet évènement");
      }
      event.cancel = true;
      return null;
    }
    if (event["type"] !== "QuickInfo") {
      if (event["type"] == "Editor") {
        this.resMobile.Name = event.data["Subject"];
        this.resMobile.StartTime = event.data["StartTime"];
        this.resMobile.EndTime = event.data["EndTime"];
        this.resMobile.group = this.ListGroup.find(g => g._id == event.data["Group"])?.name;
        event["cancel"] = true;
        return null;
      } else if (event["type"] == "DeleteAlert") {
      }
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
            console.log(this.scheduleObj.eventSettings);
            console.log(reservation);
            

          },
          (err) => {
            this.notifications.create('Erreur', "Une erreur a survenue lors de l'ajour", NotificationType.Bare, { theClass: 'outline primary', timeOut: 6000, showProgressBar: false });
          }
        )

      } else if (args.requestType === 'eventChange') {
        data = <any>args.data;
        let reservation = {
          name: this.resMobile.Name,
          startTime: this.resMobile.StartTime as Date,
          endTime: this.resMobile.EndTime as Date,
          groupe: this.selectedGroup,
          _id: (<any>args.data)["Id"],
        } as EventC;
        
        this.eventService.editEvent(reservation._id, reservation).subscribe((res) => {
          let updatedRecord = res as EventC;
          this.reservationList = this.reservationList.filter((el) => {
            if (el["_id"] == updatedRecord["_id"]) {
              el = updatedRecord;
            }
            return el;
          });

          (this.eventSettings.dataSource as Array<any>) = (this.eventSettings.dataSource as Array<any>).filter((el) => {            
            if (el["Id"] == reservation["_id"]) {
              console.log("ok");
              
              el["EndTime"] = reservation.endTime;
              el["StartTime"] = reservation.startTime;
              el["Subject"] = reservation["name"];
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
          this.fetchData(this.academyId);
        },
          (err) => {
            this.notifications.error('Erreur', "Une erreur a survenue lors de la suppression de la réseravtion",  {  timeOut: 6000, showProgressBar: false });
          });

      }
    }
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

  editEvent(event){
    const dialogRef = this.dialog.open(EditEventDialogComponent, {
      width: '100vw',height:'70%',
      data: { multiple: true,list: this.ListGroup, update: true,event: event.data,
        names: this.nomGroup , coaches: this.listCoaches }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.fetchData(this.academyId);
    });
  }


  openEditAcademy(){
    const dialogRef = this.dialog.open(AddNewAcademyComponent, {
      width: '100vw',height:'70%',
      data: { multiple: true, update: true, academy: this.currentAcademy, id: this.academyId}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.currentAcademy = result;
      let index = this.ListAcademy.findIndex(a => a._id == this.academyId);      
      this.ListAcademy[index] =  this.currentAcademy;
    });
  }


  openEdit(event) {
    
    const dialogRef = this.dialog.open(CreateTerrainComponent, {
      width: '100vw',height:'70%',
      data: {update: true, coaches: this.listCoaches, groupes: this.ListGroup, event: event?.data}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.fetchData(this.academyId);
    });
  }

  selectedGroup: Group;  
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
        this.notifications.create('Succès', "Evenement ajouté avec succès", NotificationType.Bare, { theClass: 'outline primary', timeOut: 3000, showProgressBar: false });
        this.fetchData(this.academyId);
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

  showSelectedAcademy(academy){
    console.log(academy);
    this.groupService.getAllGroupByAcademyId(academy?._id).subscribe((res) => {  
        this.ListGroup = res as Group[];
        this.nomGroup = this.ListGroup.map((el: Group) => {
          return el.name;
        });
      });
    this.academyService.getAcademyById(academy?._id).subscribe((res: Academy) => {
      this.currentAcademy = res;
      console.log(this.currentAcademy);
      
    });
    this.fetchData(academy?._id);
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

