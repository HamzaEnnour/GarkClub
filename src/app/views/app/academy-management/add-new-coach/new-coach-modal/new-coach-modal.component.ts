import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { Group } from 'src/app/shared/models/group.model';
import { IRegisterCredentails, User } from 'src/app/shared/models/user.model';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { DataSrviceService } from 'src/app/shared/services/data-srvice.service';
import { GroupsService } from 'src/app/shared/services/groups.service';
import { AddNewCoachComponent } from '../add-new-coach.component';
import { AcademyService } from 'src/app/shared/services/academy.service';

@Component({
  selector: 'app-new-coach-modal',
  templateUrl: './new-coach-modal.component.html',
  styleUrls: ['./new-coach-modal.component.scss']
})
export class NewCoachModalComponent implements OnInit {

  EquipmentFormGroup:FormGroup;
  resMobile = {
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  }
  already;
  buttonDisabled = false;
  buttonState = "";
  id: string = localStorage.getItem('academyId');
  academyId = localStorage.getItem('academyId');
  constructor(private notifications: NotificationsService,
    private _auth: AuthenticationService,
    private groupService: GroupsService,private dataService: DataSrviceService,
    public dialogRef: MatDialogRef<AddNewCoachComponent>,
    private notificationsService: NotificationsService,
    private route: ActivatedRoute,
    private academyService: AcademyService,
    @Inject(MAT_DIALOG_DATA) public data: Object) { }

  ngOnInit(): void {
    console.log(this.route.snapshot.paramMap.get('id'));
    
    // this.route.queryParams.subscribe((params) => {
    // console.log(params);
    // this.id = params['id'];
    // });
  }

  addGroup(){
    // let g: Group = {
    //   name: this.EquipmentFormGroup.value.name
    // };
    // this.groupService.createGroup(g,this.id).subscribe((a: Group) =>{
    //     console.log(a);
    //     // this.dataService.emitData(a);
    //     this.dialogRef.close();
    // });
    
    // console.log(this.EquipmentFormGroup.value);
  }

  startTimeHasChanged(event) {
    console.log(event);
    
    // this.already = false;
    // this.resMobile.StartTime = event as Date;
    // this.resMobile.EndTime = this.resMobile.StartTime.addMinutes(90);
  }

  onNoClick(): void {
    this.dialogRef.close();
}

  onSubmit(){
    let userCredentials: IRegisterCredentails = {
      firstName: this.resMobile.firstName,
      lastName: this.resMobile.lastName,
      email: this.resMobile.email,
      password: this.resMobile.password,
      confirmPassword : this.resMobile.password
    };    
      this._auth.registerCoach(this.academyId,userCredentials).subscribe((res) => {
        console.log(res);
        this.notificationsService.create('Success', "Coach ajouté",NotificationType.Bare, { theClass: 'outline primary', timeOut: 6000, showProgressBar: false });
        
      },(err) => {
        console.log(err);
      });
      this.dialogRef.close({addedCoach: userCredentials});
    
  }
}
