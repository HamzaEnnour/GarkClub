import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { PlayersComponent } from '../players.component';

@Component({
  selector: 'app-add-player-to-group',
  templateUrl: './add-player-to-group.component.html',
  styleUrls: ['./add-player-to-group.component.scss']
})
export class AddPlayerToGroupComponent implements OnInit {

  resMobile = {
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  }
  already;
  buttonDisabled = false;
  buttonState = "";
  groupId: string;
  constructor(private _auth: AuthenticationService,
    public dialogRef: MatDialogRef<PlayersComponent>,
    private notificationsService: NotificationsService,
    @Inject(MAT_DIALOG_DATA) public data: Object) { }

  ngOnInit(): void {
    this.groupId = this.data["group"];
    
    console.log(this.data);
  }
  onNoClick(): void {
    this.dialogRef.close();
}

  onSubmit(){

    let userCredentials: any = {
      firstName: this.resMobile.firstName,
      lastName: this.resMobile.lastName,
      email: this.resMobile.email,
      password: this.resMobile.password,
      confirmPassword : this.resMobile.password
    };    
      this._auth.registerPlayer(this.groupId,userCredentials).subscribe((res: any) => {
        console.log(res);
        userCredentials._id = res.player._id;
        this.notificationsService.create('Success', "Joueur ajouté",NotificationType.Bare, { theClass: 'outline primary', timeOut: 6000, showProgressBar: false });
        this.dialogRef.close({addedPlayer: userCredentials});
      },(err) => {
        console.log(err);
        this.dialogRef.close();
      });
      
    
  }
}
