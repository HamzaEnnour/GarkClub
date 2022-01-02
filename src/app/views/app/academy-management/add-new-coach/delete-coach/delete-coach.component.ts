import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { AcademyService } from 'src/app/shared/services/academy.service';

@Component({
  selector: 'app-delete-coach',
  templateUrl: './delete-coach.component.html',
  styleUrls: ['./delete-coach.component.scss']
})
export class DeleteCoachComponent implements OnInit {

  buttonDisabled = false;
  buttonState = '';

  constructor(
    public dialogRef: MatDialogRef<DeleteCoachComponent>,
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

    let coach = this.data["coach"];
    let academyId = this.data["id"];
     this.academyService.retirerCoachFromAcademy(coach._id,academyId).subscribe((res: any) => {
        // console.log(res);
        this.notificationsService.create('Succès', "Le coach a été retiré",NotificationType.Bare, { theClass: 'outline primary', timeOut: 2000, showProgressBar: false })
        this.dialogRef.close(res?.id);
      }, (err) => {
            this.notificationsService.create('Erreur', "Une erreur a survenu",NotificationType.Bare, { theClass: 'outline primary', timeOut: 2000, showProgressBar: false })
            this.dialogRef.close(err);
      });
  }

}
