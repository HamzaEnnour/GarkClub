import { Component, OnInit } from '@angular/core';
import { IUser, User } from 'src/app/shared/models/user.model';
import {UserService} from '../../../../shared/services/user.service';
import { Query,Predicate } from '@syncfusion/ej2-data';
import { MatDialog } from '@angular/material/dialog';
import { NewCoachModalComponent } from './new-coach-modal/new-coach-modal.component';
import { AcademyService } from 'src/app/shared/services/academy.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import {DeleteCoachComponent} from './delete-coach/delete-coach.component';
import { SidebarvisibilityService } from 'src/app/shared/services/sidebarvisibility.service';
import { Academy } from 'src/app/shared/models/academy.model';
import { AddNewAcademyComponent } from '../add-new-academy/add-new-academy.component';
import { ImageDialogComponent } from '../../boutique/show-terrain/image-dialog/image-dialog.component';
import { CoachService } from 'src/app/shared/services/coach.service';
@Component({
  selector: 'app-add-new-coach',
  templateUrl: './add-new-coach.component.html',
  styleUrls: ['./add-new-coach.component.scss']
})
export class AddNewCoachComponent implements OnInit {

  dataSource: any[];
  isMobile: boolean = false;
  academyId: string;
  academyCoaches: any[];
  listCoaches: IUser[];
  flagSelected: boolean;
  currentAcademy: Academy;
  image: string;
  isLoading: boolean = true;

  constructor(public dialog: MatDialog,
    private visibilityService: SidebarvisibilityService,
    private coachService: CoachService,
    private router: Router,
    private authService: AuthenticationService,
    private activatedRoute: ActivatedRoute,private notificationsService: NotificationsService,
    private academyService: AcademyService) { }

  ngOnInit(): void {
    this.academyId = this.activatedRoute.snapshot.paramMap.get('id');
    this.isLoading = false;
    this.visibilityService.emitData(false);
    this.flagSelected = false;
    this.authService.getAllCoaches().subscribe((res: IUser[]) => {
      this.listCoaches = res;
    });
    this.academyService.getAcademyById(this.academyId).subscribe((res: Academy) => {
      console.log(res);
      this.currentAcademy = res;
    })
    
    if (window.screen.width < 815) {
      this.isMobile = true;     
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

    this.authService.getAllCoaches().subscribe((user: User[])=>{
      
      this.academyService.coachesByAcademy(this.academyId).subscribe((coachs: any[])=>{
        this.academyCoaches = coachs;
      });
     
      this.dataSource = user;
      for (let index = 0; index < this.dataSource.length; index++) {
        let coach = { Name: `${this.dataSource[index].firstName} ${this.dataSource[index].lastName}`,
          LastName:this.dataSource[index].lastName, 
          Id: this.dataSource[index]._id,
          Code: this.dataSource[index].email };
        this.searchData.push(coach);
      }
    });
  }

  public searchData: { [key: string]: Object }[] = [];
    query0 =  null;
    selectedCoach: any;
    // maps the appropriate column to fields property
    public fields: Object = { value: "Code" , text:"Name"};
    // set the placeholder to the AutoComplete input
    public text: string = "Find a coach";
    public itemTemplate:string= "<span><span class='name'>${Name}</span> - <span class ='code'>${Code}</span></span>";
    public onFiltering (e)
    {
      e.preventDefaultAction=true;
      var predicate = new Predicate('Name', 'contains', e.text);
          predicate = predicate.or('Code', 'contains', e.text);
       var query = new Query();
   //frame the query based on search string with filter type.
     query = (e.text != "") ? query.where(predicate) : query;
   //pass the filter data source, filter query to updateData method.
   this.query0 = query;
   console.log(e.itemData);
   this.flagSelected = true;
   
   this.selectedCoach = {
    firstName : e.itemData.Name,
    lastName : e.itemData.LastName,
    id: e.itemData.Id
  }
   
    //  e.updateData(this.searchData, query);

    }

    addReservationDialog(){
      const dialog = this.dialog.open(NewCoachModalComponent, {
        width: '500px',
        // data: { multiple: false, terrain: this.terrainSelected }
      });
  
      dialog.afterClosed().subscribe((res) => {
        if (res) {
          // this.fetchReservationData();
        }
      })
    }
    openAddReservationMobile(){
      const dialog = this.dialog.open(NewCoachModalComponent, {
        width: '500px',
        // data: { multiple: false, terrain: this.terrainSelected }
      });
  
      dialog.afterClosed().subscribe((ev: any) => {
        console.log(ev);
        ev["addedCoach"].role = "coach";
        this.academyCoaches.push(ev["addedCoach"]);
      })
    }

    affectCoachToAcademy(coach){
      console.log(coach);
      
      this.academyService.affectCoachToAcademy(coach.id,this.academyId).subscribe((c: any) => {
        console.log(c);
        
          this.academyCoaches.push(c?.coach);
          console.log(this.academyCoaches);
          
          this.notificationsService.create('Succès', "Le coach a été affecté",NotificationType.Bare, { theClass: 'outline primary', timeOut: 2000, showProgressBar: false })
        }, (err) => {
              this.notificationsService.create('Erreur', "Une erreur a survenu",NotificationType.Bare, { theClass: 'outline primary', timeOut: 2000, showProgressBar: false })
        });
        this.selectedCoach = null;
    }

    deleteCoachFromAcademy(coach){
      const dialogRef = this.dialog.open(DeleteCoachComponent, {
        width: '450px',
        data: { coach: coach, id: this.academyId }
      });
  
      dialogRef.afterClosed().subscribe((result: any) => {
        console.log(result);
        console.log(this.dataSource);
        
      this.academyCoaches = this.academyCoaches.filter(a => a?._id != result);
      }, (err)=> {
        console.log('Erreur de suppression');
      });  
    }
    
  navigateToCoachProfile(coach){
    this.coachService.emitData(coach);
    this.router.navigateByUrl(`/football/app/coach-profile/${coach?._id}`);
  }

  openEditAcademy(){
    const dialogRef = this.dialog.open(AddNewAcademyComponent, {
      width: '100vw',height:'70%',
      data: { multiple: true, update: true}
    });

    dialogRef.afterClosed().subscribe(result => {
      // this.fetchData(this.academyId);
    });
  }

  openDialog(type: string) {
    console.log("test");
    
    const dialogRef = this.dialog.open(ImageDialogComponent, {
      width: '800px',
      data: { data: { type, id: this.academyId, image: this.image || "" } }
    });
    dialogRef.afterClosed().subscribe(result => {

    });
  }


}
