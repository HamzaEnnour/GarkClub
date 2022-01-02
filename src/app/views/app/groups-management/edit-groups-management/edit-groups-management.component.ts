import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Group } from 'src/app/shared/models/group.model';
import { DataSrviceService } from 'src/app/shared/services/data-srvice.service';
import { GroupsService } from 'src/app/shared/services/groups.service';
import { AcademyManagementComponent } from '../../academy-management/academy-management.component';

@Component({
  selector: 'app-edit-groups-management',
  templateUrl: './edit-groups-management.component.html',
  styleUrls: ['./edit-groups-management.component.scss']
})
export class EditGroupsManagementComponent implements OnInit {

  item: any;
  resMobile = {
    name: ""
  };
  already;
  buttonDisabled = false;
  buttonState = "";
  id: string = localStorage.getItem('academyId');

  constructor(
    private formBuilder: FormBuilder,
    private groupService: GroupsService,
    private dataService: DataSrviceService,
    private dialogRef: MatDialogRef<AcademyManagementComponent>,
    @Inject(MAT_DIALOG_DATA) data)
    { 
      this.item = data;
    }

  ngOnInit(): void {
    this.resMobile.name = this.item.name; 
  }

  editGroupe(){
    console.log(this.item._id);
    let newGroup: Group = {
      name: this.resMobile.name
    };
  
    this.groupService.editGroup(this.item._id,newGroup).subscribe((e: Group)=>{
      console.log(e);
    },
    (err) => {
      console.log('Can\'t update the group');
    });
    this.dataService.emitData(newGroup);
    this.dialogRef.close();
  }


  startTimeHasChanged(event) {
  }

  onNoClick(): void {
    this.dialogRef.close();
}

}
