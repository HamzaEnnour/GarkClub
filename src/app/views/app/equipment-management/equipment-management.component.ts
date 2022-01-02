import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddEquipmentComponent } from './add-equipment/add-equipment.component';
import { EquipmentService } from '../../../shared/services/equipment.service';
import { EquipmentsService } from '../../../shared/services/equipments.service';
import { EquipmentModel } from '../../../shared/models/equipment.model';
import { EditEquipentComponent } from './edit-equipent/edit-equipent.component';
import { ActivatedRoute, Router } from '@angular/router';
import { AcademyService } from 'src/app/shared/services/academy.service';
import { Subscription } from 'rxjs';
import { DeleteEquipmentComponent } from './delete-equipment/delete-equipment.component';
import { NotificationsService, NotificationType } from 'angular2-notifications';

export interface EquipmentURL {
  url: string;
}

const ELEMENT_DATA: EquipmentURL[] = [
  { url: "../../../../assets/imgs/GarkBanner5.png" },
];

@Component({
  selector: 'app-equipment-management',
  templateUrl: './equipment-management.component.html',
  styleUrls: ['./equipment-management.component.scss']
})
export class EquipmentManagementComponent implements OnInit {
  academyId: string;
  dataSource: EquipmentModel[];
  constructor(public dialog: MatDialog,
    private equipmentService: EquipmentService,
    private activatedRoute: ActivatedRoute,
    private notificationsService: NotificationsService,
    private router: Router,
    private eq: EquipmentsService) { }

  isMobile = '120px';
  loading;

  ngOnInit() {
      this.academyId = this.activatedRoute.snapshot.paramMap.get('id');
      this.eq.getEquipmentByAcademyId(this.academyId).subscribe((e: EquipmentModel[]) => {
        this.dataSource = e;
        for (let index = 0; index < this.dataSource?.length; index++) {
          this.dataSource[index].url = "../../../../assets/imgs/GarkBanner5.png";
        }
      });
  }

  // adjustImage() {
  //   let i = Math.floor(Math.random() * this.dataSource.length);
  //   return ELEMENT_DATA[i].url;
  // }

  openDialog(e,op) {
    const dialogRef = this.dialog.open(EditEquipentComponent, { width: '500px', data: {eq: e,  op: op }});
    dialogRef.afterClosed().subscribe(equipment => {
      console.log(equipment);
      
      if (equipment != null){
        // equipment._id = equipment?.eq?._id;
        equipment.url = "../../../../assets/imgs/GarkBanner5.png";
        let item = this.dataSource.find(e => e?._id == equipment?._id);
        let ind = this.dataSource.indexOf(item);
        this.dataSource[ind] = equipment;
        this.notificationsService.create('Succès', "Matériel modifié", NotificationType.Bare, { theClass: 'outline primary', timeOut: 6000, showProgressBar: false });

      }  
    });
  }

  addEquipment() {
    const dialogRef = this.dialog.open(AddEquipmentComponent, { width: '500px', data: this.academyId });
    dialogRef.afterClosed().subscribe(result => {
        // console.log(t);
        if (result != null && this.dataSource?.length > 0){
          result.url = "../../../../assets/imgs/GarkBanner5.png";
          this.dataSource.push(result);
        }
      });
  }

  delete(e) {

    const dialogRef = this.dialog.open(DeleteEquipmentComponent, { width: '500px', data: e });
    dialogRef.afterClosed().subscribe((res) => {
      if (res){
        this.dataSource = this.dataSource.filter(eq => eq._id != e._id);
      }
    });
  }

}
