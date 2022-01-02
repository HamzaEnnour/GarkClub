import { Component, HostListener, OnChanges, OnInit, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { EventRenderedArgs, EventSettingsModel, ScheduleComponent, TimeScaleModel } from '@syncfusion/ej2-angular-schedule';
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
import { CreateTerrainComponent } from '../boutique/create-terrain-dialog/create-terrain.component';
import { ImageDialogComponent } from '../boutique/show-terrain/image-dialog/image-dialog.component';
import { Title } from '@angular/platform-browser';
import { AddReservationComponent } from '../terrain/add-reservation/add-reservation.component';
import * as moment from 'moment';
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
  selector: 'app-phares',
  templateUrl: './phares.component.html',
  styleUrls: ['./phares.component.scss']
})
export class PharesComponent implements OnInit, OnChanges {
  @ViewChild('calendar') public calendar: CalendarComponent;
  @ViewChild('scheduleObj') public scheduleObj: ScheduleComponent;

  constructor(
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private terrainService: TerrainService,
    private reservationService: ReservationService,
    private notifications: NotificationsService,
    private titleService: Title,
    public AddReservationDialog: MatDialog
  ) { }
  ngOnChanges(changes: SimpleChanges): void {
    // //console.log(this.resMobile);

  }

  isMobile: boolean = false;
  reservataionModal: BsModalRef;
  backend = environment.backend;
  terrainId: string;
  terrain: Terrain;
  isLoading: boolean = true;
  ListTerrain: Terrain[] = new Array<Terrain>();
  nomTerrain: Array<String>;
  terrainSelected;
  reservationList: Array<Reservation> = new Array<Reservation>();
  buttonDisabled = false;
  buttonState = "";
  resMobile = {
    Name: "",
    num: "",
    terrain: "",
    frais: "90",
    StartTime: new Date(new Date().setMinutes(0)),
    EndTime: new Date().addMinutes(90)
  }

  public eventSettings: EventSettingsModel = { dataSource: <Object[]>extend([], null, null, true) };
  public showQuickInfo: boolean = false;
  public statusFields: Object = { text: 'Name', value: 'Name' };

  endTime: Date;
  startTime: Date;
  terrainsColors: Array<any> = new Array<any>();
  ngOnInit(): void {
    this.titleService.setTitle("Mon Agenda | GARK");
    this.route.params.subscribe((params) => {
      if (this.terrainService.openedTerrain._id !== params['id']) {
        this.terrainId = params['id'];
        this.fetchData();
      } else {
        this.terrain = this.terrainService.openedTerrain;
        this.resMobile.EndTime = this.resMobile.StartTime.addMinutes(this.terrain.duration);
      }
      this.terrainService.getAll().subscribe(
        (res) => {
          this.ListTerrain = res["terrain"] as Terrain[];

          // this.resMobile.EndTime = this.resMobile.StartTime.addMinutes(this.terrain.duration);
          this.nomTerrain = this.ListTerrain.map((el: Terrain) => {
            return el.name;
          })
        },
        (err) => { },
        () => {
          this.fetchData();
        }
      )
    })

  }

  currentViewMode = "Week"
  fetchData() {
    this.reservationService.getAll().subscribe((res) => {
      this.reservationList = res["reservations"] as Reservation[];
      this.reservationList = this.reservationList.map((el: Reservation) => {
        el.Subject = el["name"] + "<br/>" + el["num"] || "";
        return el;
      })

      this.isLoading = false

      if (window.screen.width < 815) {
        this.isMobile = true;
        this.currentViewMode = "Day";
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
      this.eventSettings = { dataSource: <Object[]>extend([], this.reservationList, null, true) };

    })
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

  openAddReservationMobile(template?: TemplateRef<any>) {

    (<HTMLElement>document.querySelector('#main')).style.display = "none";
    (<HTMLElement>document.querySelector('#fixedbutton')).style.display = "none";
    (<HTMLElement>document.querySelector('#add-new-reservation')).style.display = "block";
    this.resMobile.Name = "";
    this.resMobile.num = "";
    this.resMobile.StartTime = new Date(new Date().setHours(new Date().getHours() + 1, 0));
    this.resMobile.EndTime = new Date(new Date().setHours(new Date().getHours() + 2, 0));
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
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

  image = "";
  openDialog(type: string) {
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

  addReservationDialog() {
    const dialog = this.dialog.open(AddReservationComponent, {
      width: '500px',
      data: { multiple: true, listTerrain: this.nomTerrain, list: this.ListTerrain }
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

  public onEventRendered(args: EventRenderedArgs): void {
    (args.element as HTMLElement).style.backgroundColor = this.ListTerrain.find((el) => {
      return el["name"] == (args.data["terrain"]["name"] || args.data["terrain"])
    }).color;
  }

  onPopupOpen(event) {
    //console.log(event);
    if (event["type"] !== "QuickInfo") {
      //console.log(event["type"])
      if (event["type"] == "Editor") {
        //console.log("edittt")
        event["cancel"] = true;
        return null;
      } else if (event["type"] == "DeleteAlert") {
        //console.log("delete")
      }
      // else{
      // }
    } else {
      if (!event["data"]["Id"]) {
        event["cancel"] = true;
        return null;
      }
    }
  }
  public onActionBegin(args: { [key: string]: Object }): void {

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
              this.reservationList = new Array<Reservation>();
            }
            let myReservation = res["reservation"] as Reservation;
            myReservation.Subject = myReservation.Name;
            this.reservationList.push(myReservation);


            let last = (this.eventSettings.dataSource as Array<any>).length;
            (this.eventSettings.dataSource as Array<any>)[last - 1]["_id"] = myReservation._id;
            (this.eventSettings.dataSource as Array<any>)[last - 1]["Subject"] = (this.eventSettings.dataSource as Array<any>)[last - 1]["Name"] || (this.eventSettings.dataSource as Array<any>)[last - 1]["name"] + "<br/>" + (this.eventSettings.dataSource as Array<any>)[last - 1]["num"];
            (this.eventSettings.dataSource as Array<any>)[last - 1]["terrain"] = null;
            (this.eventSettings.dataSource as Array<any>)[last - 1]["terrain"] = myReservation.terrain

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
        let reservation = {
          Name: (<any>args.data)["Name"],
          num: (<any>args.data)["num"],
          frais: (<any>args.data)["frais"],
          StartTime: (<any>args.data)["StartTime"] as Date,
          EndTime: (<any>args.data)["EndTime"] as Date,
          terrain: (<any>args.data)["terrain"],
          _id: (<any>args.data)["_id"],
        } as Reservation;
        this.reservationService.updateOne(reservation._id, reservation).subscribe((res) => {
          let updatedRecord = res as Reservation;
          this.reservationList = this.reservationList.filter((el) => {
            if (el["_id"] == updatedRecord["_id"]) {
              el = updatedRecord;
            }
            return el;
          });

          (this.eventSettings.dataSource as Array<any>) = (this.eventSettings.dataSource as Array<any>).filter((el) => {
            if (el["_id"] == updatedRecord["_id"]) {
              el["EndTime"] = updatedRecord.EndTime;
              el["num"] = updatedRecord.num;
              el["frais"] = updatedRecord.frais;
              el["StartTime"] = updatedRecord.StartTime;
              el["Subject"] = updatedRecord["name"] + "<br/>" + updatedRecord["num"] || "";
              if (el["terrain"] instanceof Object) {
                el["terrain"]["name"] = updatedRecord.terrain["name"];
              } else {
                el["terrain"] = updatedRecord.terrain["name"];
              }

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
        let id = args.deletedRecords[0]["_id"];

        this.reservationService.deleteOne(id).subscribe((res) => {
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

  openEdit() {
    const dialogRef = this.dialog.open(CreateTerrainComponent, {
      width: '500px',
      data: { terrain: this.terrain, update: true }
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }

  TerrainChanged(event) {
    let name = event["itemData"]["value"];
    this.notSelected = false;
    this.terrain = this.ListTerrain.find((t: Terrain) => {
      return t.name === name;
    });
    this.resMobile.EndTime = this.resMobile.StartTime.addMinutes(this.terrain.duration)
  }


  validateNumber() {
    const regex = /\s/gi;
    let a = this.resMobile.num;
    a = a.replace(regex, '');
    return !isNaN(+a) && a.length == 8;
  }
  already: boolean = false;
  notSelected: boolean = false;
  onSubmit() {
    if (this.resMobile.terrain == "") {
      this.notSelected = true;
    }
    if (this.buttonDisabled || this.resMobile.Name == "" || this.resMobile.num == "" || this.resMobile.StartTime == null || this.resMobile.EndTime == null) {
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
    if (this.resMobile.terrain) {
      this.resMobile.EndTime = this.resMobile.StartTime.addMinutes(this.terrain.duration);
    } else {
      this.resMobile.EndTime = this.resMobile.StartTime.addMinutes(90);
    }
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

