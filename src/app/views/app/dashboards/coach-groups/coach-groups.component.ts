import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Group } from 'src/app/shared/models/group.model';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { GroupsService } from 'src/app/shared/services/groups.service';

@Component({
  selector: 'app-coach-groups',
  templateUrl: './coach-groups.component.html',
  styleUrls: ['./coach-groups.component.scss']
})
export class CoachGroupsComponent implements OnInit {

  dataSource : Group[];

  colors = ['#d50103', '#e77b73', '#f6bf25', '#32b679', '#098043', '#059be5', '#4050b5', '#7986cb', '#8e24aa', '#616161'];

  images: Array<any> = [
    { src: "assets/imgs/GarkBanner1.png" },
    { src: "assets/imgs/GarkBanner2.png" },
    { src: "assets/imgs/GarkBanner3.png" },
    { src: "assets/imgs/GarkBanner4.png" },
    { src: "assets/imgs/GarkBanner5.png" },
    { src: "assets/imgs/GarkBanner6.png" },
    { src: "assets/imgs/GarkBanner7.png" },
    { src: "assets/imgs/GarkBanner8.png" },
    { src: "assets/imgs/GarkBanner9.png" },
    { src: "assets/imgs/GarkBanner10.png" },
  ];

  // dataSource = ELEMENT_DATA;
  constructor(public dialog: MatDialog,private groupService: GroupsService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private _auth: AuthenticationService) { }
    isMobile = '120px';
    loading;
    academyId: string;

  ngOnInit() {
    this.academyId = this.activatedRoute.snapshot.paramMap.get('id');
    // this.groupService.getAllGroupByAcademyId(this.academyId).subscribe((e: Group[]) => {
    //   e.forEach((el: Group) => {
    //     el.image = this.adjustImage(el);
    //   });
    //   this.dataSource = e;
    // });
    this._auth.getConnectedUser().subscribe((u: any) =>{
      this.groupService.getGroupsByCoachId(u.user._id).subscribe((res: any[]) => {
        console.log(res);
        this.dataSource = res;
      })
    });
  }

  adjustImage(terrain: Group) {
    let i = Math.floor(Math.random() * 10);
      return this.images[i].src;
  }

  createNew(){}
  // addGroup() {
  //   const dialogRef = this.dialog.open(AddGroupsManagementComponent,{width:'500px',
  //   data: { update: false, id: this.academyId }});

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log(`Dialog result: ${result}`);
  //     this.groupService.getAllGroupByAcademyId(this.academyId).subscribe((e: Group[]) => {
  //       e.forEach((el: Group) => {
  //         el.image = this.adjustImage(el);
  //       });
  //       this.dataSource = e;
  //     }, (err)=> {
  //       console.log('This group can\'t be created');
  //     });
  //   });
  // }

//   edit(e){
//     console.log(e);
    
//     const dialogRef = this.dialog.open(AddGroupsManagementComponent,{width:'500px',
//     data: {e, update: true, id: this.academyId }});

//     dialogRef.afterClosed().subscribe(result => {
//       console.log(result);
//       this.dataService.subscriber.subscribe((e: any) => {
//         this.groupService.getAllGroupByAcademyId(this.academyId).subscribe((e: Group[]) => {  
//           e.forEach((el: Group) => {
//             el.image = this.adjustImage(el);
//           });   
//           this.dataSource = e;
//         }, 
//         (err)=> {
//           console.log('This Group can\'t be updated');
//         });
//     });
//   });
// }

  // delete(e){

  //   this.dataSource.forEach((element,index)=>{
  //     if(element.name == e.name && element._id == e._id) this.dataSource.splice(index,1);
  //  });
  //  this.groupService.deleteGroup(e._id).subscribe((e: Group) =>{
  //   console.log(e);
  //  }, (err)=> {
  //     console.log('This Group can\'t be deleted');
  //  })
  //   console.log(e);
  // }

  details(e){
  console.log(e);
  this.groupService.selectedGroup.next(e);
  this.router.navigateByUrl(`/football/app/dashboards/player-profile/${e._id}`);
  }

  // addPlayers(e){
  //   const dialog = this.dialog.open(AffectPlayersComponent, {
  //       width: '500px',
  //       data: { multiple: false, groupe: e}
  //     });
  
  //     dialog.afterClosed().subscribe((res) => {
        
  //     });
  // }
}
