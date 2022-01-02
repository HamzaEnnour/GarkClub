import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Academy } from 'src/app/shared/models/academy.model';
import { AcademyService } from 'src/app/shared/services/academy.service';
import { ShowHideService } from 'src/app/shared/services/show-hide.service';
import { Subscription } from 'rxjs';
import { SidebarvisibilityService } from 'src/app/shared/services/sidebarvisibility.service';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';

@Component({
  selector: 'app-coach-academies',
  templateUrl: './coach-academies.component.html',
  styleUrls: ['./coach-academies.component.scss']
})
export class CoachAcademiesComponent implements OnInit {
  colors = ['#d50103', '#e77b73', '#f6bf25', '#32b679', '#098043', '#059be5', '#4050b5', '#7986cb', '#8e24aa', '#616161'];
  imgBackground: string = "assets/imgs/GarkBanner2.png";
  isMobile: boolean = false;

  dataSource : Academy[];
  constructor(public dialog: MatDialog,private academyService: AcademyService,
    private router: Router,
    private _auth: AuthenticationService,
    private showHideService: ShowHideService,
    private visibilityService: SidebarvisibilityService) { }

  ngOnInit() {
    this.visibilityService.emitData(false);
    this.isMobile = window.screen.width < 600 ? true : false;
    this.showHideService.emitData(true);
    // this.academyService.getAllAcademies().subscribe((e: Academy[]) => {
    //   e.forEach((el: Academy) => {
    //     el.image = this.imgBackground;
    //   })
    //   this.dataSource = e;
    // });
    this._auth.getConnectedUser().subscribe((u: any) =>{
    this.academyService.getAcademiesByCoachId(u.user._id).subscribe((res: Academy[]) => {
      console.log(res);
      res.forEach((el: Academy) => {
            el.image = this.imgBackground;
          })
          this.dataSource = res;
    }) 
    });
  }

  isMobileStyle = '120px';

  // openDialog() {
  //   const dialogRef = this.dialog.open(AddNewAcademyComponent,{
  //     width: '650px',
  //     data: { academy: Academy, update: false }
  //   });

  //   dialogRef.afterClosed().subscribe((result: Academy) => {
  //     console.log(result);     
  //     this.academyService.getAllAcademies().subscribe((e: Academy[]) => {
  //       e.forEach((el: Academy) => {
  //         el.image = this.imgBackground;
  //       });
  //       this.dataSource = e;
  //     }, (err)=> {
  //       console.log('L\'ajout de l\' academie a échoué');
  //     });
  //   });
  // }

  subscription: Subscription;
  details(e){    
    this.academyService.currentAcademyId.next(e._id);
    this.router.navigateByUrl(`/football/app/dashboards/coach/${e._id}`);
  }
}
