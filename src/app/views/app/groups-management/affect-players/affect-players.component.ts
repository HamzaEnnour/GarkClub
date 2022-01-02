import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MultiSelectComponent } from '@syncfusion/ej2-angular-dropdowns';
import { IUser, User } from 'src/app/shared/models/user.model';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { GroupsService } from 'src/app/shared/services/groups.service';
import { UserService } from 'src/app/shared/services/user.service';
import {GroupsManagementComponent} from 'src/app/views/app/groups-management/groups-management.component'

@Component({
  selector: 'app-affect-players',
  templateUrl: './affect-players.component.html',
  styleUrls: ['./affect-players.component.scss']
})
export class AffectPlayersComponent implements OnInit {
  @ViewChild('checkbox', {static: true}) 
  public mulObj: MultiSelectComponent;
  groupId;
    // defined the array of data
    public data: Object[] = [];
    public fields: Object = { text: 'fullname', value: 'id' };
    // set placeholder to MultiSelect input element
    public placeholder: string = 'Chercher...';
  constructor(private userService: UserService,
    private authService: AuthenticationService,
    private groupService: GroupsService,
    public dialogRef: MatDialogRef<GroupsManagementComponent>,
    @Inject(MAT_DIALOG_DATA) public group: any) { }

  ngOnInit(): void {
    this.groupId = this.group.groupe._id;
    
    this.authService.getAllPlayers().subscribe((res: any[]) => {
      for (let index = 0; index < res.length; index++) {
        let player: Object = {id : res[index]._id, fullname : `${res[index].firstName} ${res[index].lastName}`};
        this.data.push(player);
      }
    });
  }

  affecter(){
  // console.log(this.mulObj.value);
  let playersSelectedIds = this.mulObj.value;
  let players: IUser[] = [];
  this.authService.getAllPlayers().subscribe((res: IUser[])=>{
    for (let index = 0; index < playersSelectedIds.length; index++) {
      let p: IUser = res.find(u => u._id == playersSelectedIds[index]);
      if (p != null) players.push(p);
    }
    let liste = {players : players};
    this.groupService.addPlayersToGroup(liste,this.groupId).subscribe((res) =>{
    });
    this.dialogRef.close(liste?.players);
  });
  }
}