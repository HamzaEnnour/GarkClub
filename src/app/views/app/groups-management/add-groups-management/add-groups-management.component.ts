import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { Group } from 'src/app/shared/models/group.model';
import { IUser } from 'src/app/shared/models/user.model';
import { AcademyService } from 'src/app/shared/services/academy.service';
import { GroupsService } from 'src/app/shared/services/groups.service';
import { GroupsManagementComponent } from '../groups-management.component';


interface Coaches{
  _id: string;
  value: string;
}

@Component({
  selector: 'app-add-groups-management',
  templateUrl: './add-groups-management.component.html',
  styleUrls: ['./add-groups-management.component.scss']
})
export class AddGroupsManagementComponent implements OnInit {

  @ViewChild('groupForm') groupForm: NgForm;
  resMobile: Group = {
    name: "",
    coach: null,
    color: ""
  }
  already;
  academyCoaches: Coaches[] = [];
  selectedItem: string;
  nomCoaches: Array<string> = new Array<string>();
  buttonDisabled = false;
  buttonState = "";
  selectedColor;
  
  selectedCoach: IUser;
  flag: boolean = true;
  update: boolean = false;
  academyId;
  colors = ['#d50103', '#e77b73', '#f6bf25', '#32b679', '#098043', '#059be5', '#4050b5', '#7986cb', '#8e24aa', '#616161'];

  constructor(private academyService: AcademyService,
    private groupService: GroupsService,
    public dialogRef: MatDialogRef<GroupsManagementComponent>,
    private notificationsService: NotificationsService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    console.log(this.data);
    this.academyId = this.data["id"];
    this.update = this.data["update"] as boolean;
    this.academyService.coachesByAcademy(this.academyId).subscribe((res: IUser[]) => {
      for (let index = 0; index < res.length; index++) {
        let c: Coaches = {_id : res[index]?._id, value: `${res[index]?.firstName} ${res[index]?.lastName}`}
        this.academyCoaches.push(c)
      }      
        if (this.update) {
          this.selectedCoach = this.data.e?.coach;
          this.resMobile.name = this.data.e.name;
          this.selectedColor = this.data.e?.color ?? this.colors[0];
          this.resMobile.color = this.selectedColor;
          this.resMobile.coach = this.selectedCoach;
          console.log(this.selectedCoach);
          
          this.selectedItem = this.academyCoaches.find(c => c?._id == this.selectedCoach?._id)?._id;
          console.log(this.selectedItem);
          
          
        } else {
          this.selectedColor = this.colors[0];
          this.resMobile = new Group();
          this.resMobile.color = this.colors[0];
        }
    });    
  }

  choose(color) {
    console.log(color);
    this.selectedColor = color;
  }

  startTimeHasChanged(event) {
    console.log(event);
  }

  
  CoachHasChanged(event){
    this.already = false;    
    console.log(this.academyCoaches.find(c => c._id == event["value"]));
    this.academyService.coachesByAcademy(this.academyId).subscribe((res: IUser[]) => {
      this.selectedCoach = res?.find(c => c._id = this.academyCoaches.find(c => c._id == event["value"])?._id);
      console.log(this.selectedCoach);
    });
  }

  onNoClick(): void {
    this.flag = false;
    this.dialogRef.close();
}

  onSubmit(){
    if (!this.groupForm.valid || this.buttonDisabled) {
      return;
    }

    this.buttonDisabled = true;
    this.buttonState = 'show-spinner';
    let group: Group = {
      name: this.resMobile.name,
      color: this.selectedColor,
      coach: this.selectedCoach
    };
    console.log(group.coach);
    console.log(this.selectedCoach);
    
    if(!this.update){
      this.groupService.createGroup(group,this.academyId).subscribe((g: Group) =>{
        this.buttonDisabled= false;
        this.buttonState = '';
        this.notificationsService.create('Succès', "Groupe ajouté",NotificationType.Bare, { theClass: 'outline primary', timeOut: 2000, showProgressBar: false })
        this.dialogRef.close(group);
      },
      (err) => {
        this.buttonDisabled= false;
        this.buttonState = '';
        this.notificationsService.create('Erreur', "Une erreur a survenue veuillez réessayer",NotificationType.Bare, { theClass: 'outline primary', timeOut: 6000, showProgressBar: false })
      });
    }else if (this.update && this.flag){
      this.groupService.editGroup(this.data?.e?._id,group).subscribe((e: Group)=>{
        console.log(e);
        
        this.buttonDisabled= false;
        this.buttonState = '';
        this.notificationsService.create('Succès', "Club modifié",NotificationType.Bare, { theClass: 'outline primary', timeOut: 2000, showProgressBar: false })
        this.dialogRef.close(group);
      },
      (err) => {
        this.buttonDisabled= false;
        this.buttonState = '';
        this.notificationsService.create('Erreur', "Une erreur a survenue veuillez réessayer",NotificationType.Bare, { theClass: 'outline primary', timeOut: 6000, showProgressBar: false });
      }
      )};
    this.flag = true;
  }
}
