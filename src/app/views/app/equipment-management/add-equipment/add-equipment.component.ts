import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { EquipmentModel } from 'src/app/shared/models/equipment.model';
import { Finance } from 'src/app/shared/models/finance.model';
import { EquipmentsService } from 'src/app/shared/services/equipments.service';
import { FinanceService } from 'src/app/shared/services/finance.service';
import {EquipmentService} from '../../../../shared/services/equipment.service'
import { EquipmentManagementComponent } from '../equipment-management.component';

interface Category {
  value: string;
  viewValue: string;
}

interface Equipment {
  category: string;
  quantity: number;
  price: number;
  url: string;
}

@Component({
  selector: 'app-add-equipment',
  templateUrl: './add-equipment.component.html',
  styleUrls: ['./add-equipment.component.scss']
})
export class AddEquipmentComponent implements OnInit {

  selectedValue: string;
  flag: boolean = true;

  selectedValue1: EquipmentModel;
  resMobile = {
    category: "",
    quantity: "",
    unitPrice: ""
  }
  already;
  buttonDisabled = false;
  buttonState = "";
  id: string;// = localStorage.getItem('academyId');
  constructor(private equipmentService: EquipmentService,
		private notificationsService: NotificationsService,
    private eq: EquipmentsService,
    private dialogRef: MatDialogRef<EquipmentManagementComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any)
    { 

    }

  ngOnInit(): void {
    this.id = this.data;
  }

  startTimeHasChanged(event) {
    console.log(event);
  }

  onNoClick(): void {
    this.flag = false;
    this.dialogRef.close();
}

  onSubmit(){
    console.log(this.resMobile);
    if (this.flag){
      let equipment: EquipmentModel = {
        category:  this.resMobile.category,
        quantity: Number(this.resMobile.quantity),
        unitPrice: 0 //(Number(this.resMobile.unitPrice) * Number(this.resMobile.quantity)), 
      }
      
      this.eq.createquipment(equipment,this.id).subscribe((e: any)=>{
        equipment._id = e?.equipment?._id;

        this.notificationsService.create('Succès', 'abonnement ajouté avec succès', NotificationType.Bare, {
                theClass: 'outline primary',
                timeOut: 2000,
                showProgressBar: false
              });
            },(err) => {
                  this.notificationsService.create(
                    'Erreur',
                    'Une erreur a survenue veuillez réessayer',
                    NotificationType.Bare,
                    { theClass: 'outline primary', timeOut: 2000, showProgressBar: false }
              );
      });
      // this.equipmentService.emitData(equipment);
      this.dialogRef.close(equipment);
      // console.log(this.EquipmentFormGroup.value);
    }
  }
}
