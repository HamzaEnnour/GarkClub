import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Query, DataManager,Predicate } from '@syncfusion/ej2-data';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationsService, NotificationType } from 'angular2-notifications';

import { Abonnement } from 'src/app/shared/models/abonnement.model';
import { FinanceService } from 'src/app/shared/services/finance.service';
import { AbonnementService } from 'src/app/shared/services/abonnement.service';
import { AcademyService } from 'src/app/shared/services/academy.service';
import { IUser } from 'src/app/shared/models/user.model';
import { FilteringEventArgs } from '@syncfusion/ej2-dropdowns';
import { Finance } from 'src/app/shared/models/finance.model';

@Component({
  selector: 'app-add-subscription-dialog',
  templateUrl: './add-subscription-dialog.component.html',
  styleUrls: ['./add-subscription-dialog.component.scss']
})
export class AddSubscriptionDialogComponent implements OnInit {

  academyId = localStorage.getItem('academyId');
	@ViewChild('createForm') createForm: NgForm;
	buttonDisabled = false;
	buttonState = '';
	update: boolean = false;
	isSpent: boolean = false;
	finance: Abonnement = new Abonnement();
  	dataSource: IUser[];
	selectedUser: IUser;
	flag: boolean = true;
	constructor(
		private abonnementService: AbonnementService,
		public dialogRef: MatDialogRef<AddSubscriptionDialogComponent>,
		private notificationsService: NotificationsService,
		private financeService: FinanceService,
    private academyService: AcademyService,
		@Inject(MAT_DIALOG_DATA) public data: Object
	) {}

	datedebut;
	datefin;
	ngOnInit(): void {
		this.update = !this.data['create'];
		this.isSpent = this.data['isSpent'];
		this.flag = this.data['finance'];
		if (this.data['player']){
			this.selectedUser = this.data['player'] as IUser;
			this.finance.player = this.data['player'] as IUser;
		}
		
		// this.finance.date = new Date();
		let date_ob = new Date();
		let date = ('0' + date_ob.getDate()).slice(-2);
		let month = ('0' + (date_ob.getMonth() + 1)).slice(-2);
		let year = date_ob.getFullYear();
		this.datedebut = year + '-' + month + '-' + date;
		this.datefin = year + '-' + month + '-' + date;
    this.academyService.getPlayersByAcademy(this.academyId).subscribe((res: IUser[])=> {
      console.log(res);
      this.dataSource = res;
      for (let index = 0; index < this.dataSource.length; index++) {
        let player = { Name: this.dataSource[index].firstName,
          LastName:this.dataSource[index].lastName, 
          Id: this.dataSource[index]._id,
          Code: this.dataSource[index].email };
        this.searchData.push(player);
      }
    });
	}

	onSubmit() {
		if (!this.createForm.valid || this.buttonDisabled) {
			return;
		}
		this.buttonDisabled = true;
		this.buttonState = 'show-spinner';
	
		console.log(this.finance);
		this.abonnementService.createSubscription(this.finance).subscribe((res) => {
			console.log(res);
		});
		let abonnement: Finance = {
			_id : this.finance._id,
			amount : this.finance.frais,
			isSpent: false,
			date: this.finance.StartTime,
			label: `abonnement ${this.finance.player.firstName} ${this.finance.player.lastName}`,
			type : 'abonnement',
			createdAt: new Date(),
			updatedAt: new Date(),
		}
		this.financeService.createIncome(abonnement, this.academyId).subscribe(
			(res) => {
				////console.log( res );
				this.notificationsService.create('Succès', 'abonnement ajouté avec succès', NotificationType.Bare, {
					theClass: 'outline primary',
					timeOut: 2000,
					showProgressBar: false
				});
				this.buttonState = '';
				setTimeout(() => {
					this.buttonDisabled = false;
					this.dialogRef.close({data: res, player: this.finance.player});
				}, 1500);
			},
			(err) => {
				////console.log(err);
				this.notificationsService.create(
					'Erreur',
					'Une erreur a survenue veuillez réessayer',
					NotificationType.Bare,
					{ theClass: 'outline primary', timeOut: 2000, showProgressBar: false }
				);
				this.buttonState = '';
				this.buttonDisabled = false;
			}
		);
	}

	onNoClick(): void {
		this.dialogRef.close();
	}

  public searchData: { [key: string]: Object }[] = [];
  // selectedCoach: any;
  // maps the appropriate column to fields property
  public fields: Object = { value: "Code" , text:"Name"};
//   query0: Query = new Query();
  // set the placeholder to the AutoComplete input
  public text: string = "Trouver un joueur";
  public itemTemplate:string= "<span><span class='name'>${Name}</span> - <span class ='code'>${Code}</span></span>";
//   public onFiltering (e: FilteringEventArgs)
//   {
// 	  //   console.log(e.itemData);
// 	  let data: any = {...e};
// 	  this.selectedUser = this.dataSource.find(u => u._id == data.itemData.Id);

// 	  e.preventDefaultAction = true;
// 	  var predicate = new Predicate('Name', 'contains', e.text);
// 	  predicate = predicate.or('Code', 'contains', e.text);
// 	  var query = new Query();
// 	  //frame the query based on search string with filter type.
// 	  query = (e.text != "") ? query.where(predicate) : query;
// 	  //pass the filter data source, filter query to updateData method.

// 	  this.finance.player = this.selectedUser;
// 	  e.updateData(this.searchData, query);
//   }
}
