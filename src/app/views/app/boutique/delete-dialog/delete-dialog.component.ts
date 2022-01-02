import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { TerrainService } from 'src/app/shared/services/terrain.service';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss']
})
export class DeleteDialogComponent implements OnInit {

  buttonDisabled = false;
    buttonState = '';

  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    private terrainService: TerrainService,
    private notificationsService: NotificationsService,
    @Inject(MAT_DIALOG_DATA) public data: Object
  ) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirm(){
    this.buttonDisabled = true;
    this.buttonState = 'show-spinner';
    this.terrainService.delete(this.data["terrain"]["_id"]).subscribe(
      (res)=>{
        this.buttonDisabled= false;
        this.buttonState = '';
        this.notificationsService.create('Succès', "Terrain supprimé",NotificationType.Bare, { theClass: 'outline primary', timeOut: 2000, showProgressBar: false })
        this.dialogRef.close(res);
      },
      (err)=>{
        this.buttonDisabled= false;
        this.buttonState = '';
        this.notificationsService.create('Succès', "Une erreur a survenu",NotificationType.Bare, { theClass: 'outline primary', timeOut: 2000, showProgressBar: false })
        this.dialogRef.close(err);
      }
    )

  }

}
