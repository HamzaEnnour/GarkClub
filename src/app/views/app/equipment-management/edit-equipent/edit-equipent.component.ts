import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { EquipmentModel } from 'src/app/shared/models/equipment.model';
import { EquipmentsService } from 'src/app/shared/services/equipments.service';
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
  selector: 'app-edit-equipent',
  templateUrl: './edit-equipent.component.html',
  styleUrls: ['./edit-equipent.component.scss']
})
export class EditEquipentComponent implements OnInit {

  data: any;
  resMobile = {
    quantity: "",
    unitPrice: ""
  }
  already;
  buttonDisabled = false;
  buttonState = "";

  constructor(private formBuilder: FormBuilder,
    private eq: EquipmentsService,
    private notificationsService: NotificationsService,
    private dialogRef: MatDialogRef<EquipmentManagementComponent>,
    @Inject(MAT_DIALOG_DATA) data)
    {
      this.data = data;
    }

  ngOnInit(): void {
    console.log(this.data);
      
  }

  onNoClick(): void {
    this.dialogRef.close();
}

  onSubmit(){    
    let equipment: EquipmentModel = {
      _id: this.data["eq"]._id,
      category:  this.data["eq"].category,
      quantity: (this.data["op"] == "add") ? 
      Number(this.data["eq"].quantity)+ Number(this.resMobile.quantity)
      : Number(this.data["eq"].quantity) - Number(this.resMobile.quantity),
      unitPrice: 0
    }
    
    this.eq.editquipment(this.data["eq"]._id,equipment).subscribe((e: any)=>{
      console.log(e);
      
      this.notificationsService.create('Succès', "Matériel modifié", NotificationType.Bare, { theClass: 'outline primary', timeOut: 6000, showProgressBar: false });
      // equipment._id = e?.eq?._id;
      this.dialogRef.close(equipment);
    });
    // this.equipmentService.emitData(equipment);
    
  }
}
