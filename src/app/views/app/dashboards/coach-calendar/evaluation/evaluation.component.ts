import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { Terrain } from 'src/app/shared/models/terrain.model';
import { TerrainService } from 'src/app/shared/services/terrain.service';
import { EventCalendarService } from 'src/app/shared/services/eventCalendar.service';

@Component({
  selector: 'app-evaluation',
  templateUrl: './evaluation.component.html',
  styleUrls: ['./evaluation.component.scss']
})
export class EvaluationComponent implements OnInit {

    @ViewChild('createForm') createForm: NgForm;
    buttonDisabled = false;
    buttonState = '';
    selectedColor;
    terrain: Terrain;
    update: boolean = false;

    uniqueTerrain: boolean = false;
    monGroup: Array<any> = new Array<any>();
    listGroup: Array<Terrain> = new Array<Terrain>();
    already;
    public tabClass: string = 'tab-class';
    // monGroup: string = ""
    resMobile = {
        Name: "",
        Groupe: "",
        Coach: "",
        StartDate: new Date(new Date().setHours(new Date().getHours() + 1, 0, 0)),
        EndDate: new Date(new Date().setHours(new Date().getHours() + 2, 0, 0))
    }

    colors = ['#d50103' , '#e77b73' , '#f6bf25' , '#32b679' , '#098043' , '#059be5' , '#4050b5' , '#7986cb' , '#8e24aa' , '#616161'];
    constructor(
      private eventCalendar: EventCalendarService,
        private router: Router,
        public dialogRef: MatDialogRef<EvaluationComponent>,
        private notificationsService: NotificationsService,
        @Inject(MAT_DIALOG_DATA) public data: Object) { }
    
        id = this.data["group"]._id;
    ngOnInit(): void {
      console.log(this.data);
      
      this.resMobile.Name = this.data["event"].Subject;
        this.resMobile.Groupe = this.data["group"].name;
        this.resMobile.StartDate = this.data["event"].StartTime;
        this.resMobile.EndDate = this.data["event"].EndTime;
        this.resMobile.Coach = "coach";
              
        this.update = this.data["update"] as boolean;
        if(this.update == true){
            this.terrain = this.data["terrain"] as Terrain;
            // this.selectedColor = this.terrain.color || this.colors[0];
        }else{
            this.selectedColor = this.colors[0];
            this.terrain = new Terrain();
            this.terrain.duration = 90;
            this.terrain.color = this.selectedColor;
        }
    }

    onSubmit() {
      console.log(this.data["event"]);
      
      this.eventCalendar.emitData(this.data["event"]);
      localStorage.setItem('event',JSON.stringify(this.data["event"]));
        this.router.navigateByUrl(`/football/app/dashboards/coach-review/${this.id}`);
        this.dialogRef.close();
    }

   


    onNoClick(): void {
        this.dialogRef.close();
    }

}
