import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { Academy } from 'src/app/shared/models/academy.model';
import { AcademyService } from 'src/app/shared/services/academy.service';

@Component({
  selector: 'app-delete-academy',
  templateUrl: './delete-academy.component.html',
  styleUrls: ['./delete-academy.component.scss']
})
export class DeleteAcademyComponent implements OnInit {

  buttonDisabled = false;
  buttonState = '';

  constructor(
    public dialogRef: MatDialogRef<DeleteAcademyComponent>,
    private academyService: AcademyService,
    private notificationsService: NotificationsService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    console.log(this.data);

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirm() {
    this.buttonDisabled = true;
    this.buttonState = 'show-spinner';

    this.academyService.deleteAcademy(this.data.academy._id).subscribe(
      (e: Academy) => {
        this.notificationsService.create('Succès', "Academie supprimée",NotificationType.Bare, { theClass: 'outline primary', timeOut: 2000, showProgressBar: false })
        this.dialogRef.close(this.data.academy);
      }, (err) => {
        console.log('This Academy can\'t be deleted');
        this.notificationsService.create('Erreur', "Une erreur a survenu",NotificationType.Bare, { theClass: 'outline primary', timeOut: 2000, showProgressBar: false })
        this.dialogRef.close(err);
      });
  }
}
