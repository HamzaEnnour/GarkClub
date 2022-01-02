import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { IUser } from 'src/app/shared/models/user.model';
import { GroupsService } from 'src/app/shared/services/groups.service';

@Component({
  selector: 'app-delete-player',
  templateUrl: './delete-player.component.html',
  styleUrls: ['./delete-player.component.scss']
})
export class DeletePlayerComponent implements OnInit {

  buttonDisabled = false;
  buttonState = '';
  groupId:string;
  player: IUser;
e
  constructor(
    public dialogRef: MatDialogRef<DeletePlayerComponent>,
    private notificationsService: NotificationsService,
    private groupeService: GroupsService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    console.log(this.data);
    this.groupId = this.data['id'];
    this.player = this.data['player']?.player;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirm() {
    this.buttonDisabled = true;
    this.buttonState = 'show-spinner';

    this.groupeService.deletePlayer(this.player._id,this.groupId).subscribe((res) => {
        console.log(res);
        this.notificationsService.create('Success', "Joueur retiré",NotificationType.Bare, { theClass: 'outline primary', timeOut: 6000, showProgressBar: false });
        this.dialogRef.close(this.player);
      });
  }
}
