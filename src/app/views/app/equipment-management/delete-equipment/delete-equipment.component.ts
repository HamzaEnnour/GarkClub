import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { EquipmentModel } from 'src/app/shared/models/equipment.model';
import { IUser } from 'src/app/shared/models/user.model';
import { EquipmentsService } from 'src/app/shared/services/equipments.service';

@Component({
  selector: 'app-delete-equipment',
  templateUrl: './delete-equipment.component.html',
  styleUrls: ['./delete-equipment.component.scss']
})
export class DeleteEquipmentComponent implements OnInit {

  buttonDisabled = false;
  buttonState = '';
  groupId:string;
  player: IUser;
e
  constructor(
    public dialogRef: MatDialogRef<DeleteEquipmentComponent>,
    private notificationsService: NotificationsService,
    private eq: EquipmentsService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    console.log(this.data);
    this.groupId = this.data['id'];
    this.player = this.data['player']
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  confirm() {
    this.buttonDisabled = true;
    this.buttonState = 'show-spinner';

    this.eq.deleteEquipment(this.data._id).subscribe((equipment: EquipmentModel) => {
      this.notificationsService.create('Succès', "Matériel supprimé", NotificationType.Bare, { theClass: 'outline primary', timeOut: 6000, showProgressBar: false });
      this.dialogRef.close(true);
    }, (err) => {
      console.log('Erreur lors de la suppression');
      this.dialogRef.close();
    })
  }

}
