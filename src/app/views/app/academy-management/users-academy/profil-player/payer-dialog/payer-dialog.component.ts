import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { Abonnement } from 'src/app/shared/models/abonnement.model';
import { Finance } from 'src/app/shared/models/finance.model';
import { AbonnementService } from 'src/app/shared/services/abonnement.service';
import { FinanceService } from 'src/app/shared/services/finance.service';

@Component({
  selector: 'app-payer-dialog',
  templateUrl: './payer-dialog.component.html',
  styleUrls: ['./payer-dialog.component.scss']
})
export class PayerDialogComponent implements OnInit {

  buttonDisabled = false;
  buttonState = '';
  finance: Abonnement = new Abonnement();

  constructor(private abonnementService: AbonnementService,
    public dialogRef: MatDialogRef<PayerDialogComponent>,
    private notificationsService: NotificationsService,
    private financeService: FinanceService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    console.log(this.data);
    this.finance.player = this.data?.player;
    this.finance.frais = Number(this.data["frais"]);
    this.finance.StartTime = this.data["debut"];
    this.finance.EndTime = this.data["fin"];
    this.finance.academy = this.data?.academy;
    
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirm() {
    this.buttonDisabled = true;
    this.buttonState = 'show-spinner';

    this.abonnementService.createSubscription(this.finance).subscribe((res) => {
			console.log(res);
		});
		let abonnement: Finance = {
			// _id : this.finance._id,
			amount : this.finance.frais,
			isSpent: false,
			date: this.finance.StartTime,
			label: `abonnement ${this.finance.player.firstName} ${this.finance.player.lastName}`,
			type : 'abonnement',
			createdAt: new Date(),
			updatedAt: new Date(),
		}
		this.financeService.createIncome(abonnement, this.data?.academy?._id).subscribe(
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
					this.dialogRef.close({data: res, player: this.finance.player, payed: true});
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
}
