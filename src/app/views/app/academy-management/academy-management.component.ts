import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Academy } from 'src/app/shared/models/academy.model';
import { AcademyService } from 'src/app/shared/services/academy.service';
import { DataSrviceService } from 'src/app/shared/services/data-srvice.service';
import { AddNewAcademyComponent } from './add-new-academy/add-new-academy.component';
import { ShowHideService } from 'src/app/shared/services/show-hide.service';
import { DeleteAcademyComponent } from './delete-academy/delete-academy.component';
import { Subscription } from 'rxjs';
import { SidebarvisibilityService } from 'src/app/shared/services/sidebarvisibility.service';


export interface PeriodicElement {
  name: string;
  address: string;
}

@Component({
  selector: 'app-academy-management',
  templateUrl: './academy-management.component.html',
  styleUrls: ['./academy-management.component.scss']
})
export class AcademyManagementComponent implements OnInit {

  colors = ['#d50103', '#e77b73', '#f6bf25', '#32b679', '#098043', '#059be5', '#4050b5', '#7986cb', '#8e24aa', '#616161'];
  imgBackground: string = "assets/imgs/GarkBanner2.png";
  isMobile: boolean = false;

  dataSource : Academy[];
  constructor(public dialog: MatDialog,private academyService: AcademyService,
    private cdRef : ChangeDetectorRef,
    private router: Router,
    private showHideService: ShowHideService,
    private visibilityService: SidebarvisibilityService,
    private dataService: DataSrviceService) { }

  ngOnInit() {
    this.visibilityService.emitData(false);
    this.isMobile = window.screen.width < 600 ? true : false;
    this.showHideService.emitData(true);
    this.academyService.getAllAcademies().subscribe((e: Academy[]) => {
      // e.forEach((el: Academy) => {
      //   el.image = this.imgBackground;
      // })
      this.dataSource = e;
      console.log(this.dataSource);
      
    });    
  }

  isMobileStyle = '120px';

  openDialog() {
    const dialogRef = this.dialog.open(AddNewAcademyComponent,{
      width: '650px',
      data: { academy: Academy, update: false }
    });

    dialogRef.afterClosed().subscribe((result: Academy) => {
      console.log(result);     
      this.academyService.getAllAcademies().subscribe((e: Academy[]) => {
        this.dataSource = e;
      }, (err)=> {
        console.log('L\'ajout de l\' academie a échoué');
      });
    });
  }

  edit(academy){
    const dialogRef = this.dialog.open(AddNewAcademyComponent,
      {data: {academy,update: true},width: '500px'});

    dialogRef.afterClosed().subscribe(result => {
      this.dataService.subscriber.subscribe((e: any) => {
        this.academyService.getAllAcademies().subscribe((e: Academy[]) => {    
          e.forEach((el: Academy) => {
            el.image = this.imgBackground;
          }) 
          this.dataSource = e;
        }, 
        (err)=> {
          console.log('Erreur ...');
        });
    });
  });
}

  delete(e){
    const dialogRef = this.dialog.open(DeleteAcademyComponent, {
      width: '450px',
      data: { academy: e }
    });

    dialogRef.afterClosed().subscribe((result: Academy) => {
    this.dataSource = this.dataSource.filter(a => a._id != result._id);
    }, (err)=> {
      console.log('Erreur de suppression');
    });    
  }
  subscription: Subscription;
  details(e){
    this.academyService.currentAcademyId.next(e._id);
    this.router.navigateByUrl(`/football/app/details/${e._id}`);
  }

  addCoach(e){
    this.router.navigateByUrl(`/football/app/coach/${e._id}`);
  }

  manegePlayers(e){
    // console.log(e);
    this.router.navigateByUrl(`/football/app/playeracademy/${e._id}`);
  }

}
