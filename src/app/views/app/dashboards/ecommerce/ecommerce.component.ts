import {
	Component,
	HostListener,
	AfterViewInit,
	Input,
	OnInit,
	ViewChild,
	ViewEncapsulation,
	QueryList,
	ViewChildren
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { Finance } from 'src/app/shared/models/finance.model';
import { FinanceService } from 'src/app/shared/services/finance.service';
import { CreateSpentIncomeDialog } from './create-spent-income-dialog/create-spent-income-dialog.component';
import { fromEvent } from 'rxjs';
import { map, debounceTime } from 'rxjs/operators';
import { PopoverDirective } from 'ngx-bootstrap/popover';
import { AddSubscriptionDialogComponent } from './add-subscription-dialog/add-subscription-dialog.component';
import { ActivatedRoute } from '@angular/router';
import { AbonnementService } from 'src/app/shared/services/abonnement.service';
import { IUser, User } from 'src/app/shared/models/user.model';
import { Academy } from 'src/app/shared/models/academy.model';
import { AcademyService } from 'src/app/shared/services/academy.service';

@Component({
	selector: 'app-ecommerce',
	templateUrl: './ecommerce.component.html',
	styleUrls: [ './ecommerce.component.scss' ],
	encapsulation: ViewEncapsulation.None
})
export class EcommerceComponent implements OnInit, AfterViewInit {
	// academyId = localStorage.getItem('academyId');
	academyId: string;
	playersPayed: any[] = [];
	currentAcademy: Academy;
	currentfee;
	playersNotPayed = new Array<IUser>();

	constructor(private titleService: Title, 
		public dialog: MatDialog,
		private abonnementService: AbonnementService,
		private academyService: AcademyService,
		private activatedRoute: ActivatedRoute,
		private financeService: FinanceService) {}

	my_messages = {
		emptyMessage: 'Aucune donnée à afficher',
		totalMessage: ''
	};

	public currentPageLimit: number = 5;
	public currentVisible: number = 3;
	loadingIndicator = true;
	reorderable = true;
	isPopOpen = false;
	@Input() title = 'dashboards.best-sellers';
	@ViewChild('search', { static: false })
	search: any;
	@ViewChild(DatatableComponent) public table: DatatableComponent;
	class = 'icon-cards-row';

	columns = [
		{ name: 'Désignation', prop: 'label', sortable: false },
		{ name: 'Date', prop: 'date', sortable: true },
		{ name: 'Type', prop: 'isSpent' },
		{ name: 'Montant', prop: 'amount', sortable: true }
	];

	ColumnMode = ColumnMode;
	stats = [
		{ prop: 'income', name: 'Revenues', amount: 0, icon: 'flaticon-money-1', color: '#77e773' },
		{ prop: 'isSpent', name: 'Dépenses', amount: 0, icon: 'flaticon-money-1', color: '#77e773' },
		{ prop: 'benifits', name: 'Bénifices', amount: 0, icon: 'flaticon-money-1', color: '#77e773' }
	];

	isMobile: boolean = false;

	@HostListener('window:resize', [ '$event' ])
	onResize(event) {
		if (window.screen.width < 815) {
			this.isMobile = true;
		}
	}

	ngOnInit() {
		this.academyId = this.activatedRoute.snapshot.paramMap.get('id');
		
		this.isMobile = window.screen.width < 815 ? true : false;
		this.titleService.setTitle('Comptabilité | GARK');
		this.getFinanceState();
		this.getStats();

		this.abonnementService.checkPayment(this.academyId).subscribe((res: any[]) => {
			console.log(res);
			
			for (let index = 0; index < res.length; index++) {
				if (res[index]?.payed){
					this.playersPayed.push(res[index]);
				}else{
					this.playersNotPayed.push(res[index]);
				}
			}
			console.log(this.playersPayed);
			console.log(this.playersNotPayed);
		  });

		  this.academyService.getAcademyById(this.academyId).subscribe((a: Academy) => {
			  this.currentfee = a?.frais;
			  console.log(this.currentfee);
			  
		  })
	  
	}

	ngAfterViewInit(): void {
		// fromEvent(this.search.nativeElement, 'keydown')
		// 	.pipe(debounceTime(550), map((x) => x['target']['value']))
		// 	.subscribe((value) => {
		// 		this.updateFilter(value);
		// 	});
	}

	getStats() {
		this.financeService.getStats(this.academyId).subscribe((res) => {
			console.log(res);
			if (res) {
				this.stats.forEach((el) => {
					if (el.prop == 'income') {
						el.amount = res['income'];
					}
					if (el.prop == 'isSpent') {
						el.amount = res['spent'];
					}
					if (el.prop == 'benifits') {
						el.amount = res['benifits'];
					}
				});
			}
		});
	}

	clickCreateSpent() {
		const spentDialog = this.dialog.open(CreateSpentIncomeDialog, {
			width: '500px',
			data: { create: true, isSpent: true }
		});

		spentDialog.afterClosed().subscribe((res) => {
			if (res) {
				// //console.log(res);
				this.getFinanceState();
				this.getStats();
			}
		});
	}

	clickCreateIncome() {
		const spentDialog = this.dialog.open(CreateSpentIncomeDialog, {
			width: '500px',
			data: { create: true, isSpent: false }
		});

		spentDialog.afterClosed().subscribe((res) => {
			if (res) {
				// //console.log(res);
				// this.finances.push(res as Finance)
				this.getFinanceState();
				this.getStats();
			}
		});
	}

	addSubscription() {
		const spentDialog = this.dialog.open(AddSubscriptionDialogComponent, {
			width: '500px',
			data: { create: true, isSpent: false, finance: true,player: null }
		});

		spentDialog.afterClosed().subscribe((res) => {
			if (res) {
				// //console.log(res);
				// this.finances.push(res as Finance)
				this.getFinanceState();
				this.getStats();
			}
		});
	}

	finances: Array<Finance> = new Array<Finance>();
	filtred: Array<Finance> = new Array<Finance>();
	filterType: string = '';
	getFinanceState() {
		this.loadingIndicator = true;
		this.financeService.getAll(this.academyId).subscribe(
			(res) => {
				console.log(res);
				
				this.finances = res['finances'] as Array<Finance>;

				this.finances.forEach((f: Finance) => {
					if (f.isSpent) {
						f.amount = -f.amount;
					}
				});
				this.finances = this.finances.sort((el1: Finance, el2: Finance) => {
					// //console.log( new Date(el2.date).getTime());
					return new Date(el2.date).getTime() - new Date(el1.date).getTime();
				});
				this.filtred = this.finances;
				this.loadingIndicator = false;
			},
			(err) => {
				// //console.log(err);
			}
		);
	}

	filter(type: string, dateDebut?: Date, dateFin?: Date) {
		if (type === 'spent') {
			this.filterType = 'spent';
			this.finances = this.filtred;
			this.finances = this.finances.filter((el: Finance) => {
				if (el.isSpent) {
					return el;
				} else {
					return false;
				}
			});
		} else if (type === 'income') {
			this.filterType = 'income';
			this.finances = this.filtred;
			this.finances = this.finances.filter((el: Finance) => {
				if (!el.isSpent) {
					return el;
				} else {
					return false;
				}
			});
		} else {
			//type === 'date
		}
	}

	dismissFilter() {
		this.filterType = '';
		this.finances = this.filtred;
	}

	updateFilter(val: any) {
		const value = val.toString().toLowerCase().trim();
		// this.finances = this.filtred;
		// get the amount of columns in the table
		const count = this.columns.length;
		// get the key names of each column in the dataset
		const keys = Object.keys(this.finances[0]);
		// assign filtered matches to the active datatable
		this.finances = this.finances.filter((item) => {
			// iterate through each row's column data
			for (let i = 0; i < count; i++) {
				// check for a match
				if ((item[keys[i]] && item[keys[i]].toString().toLowerCase().indexOf(value) !== -1) || !value) {
					// found match, return true to add to result set
					return true;
				}
			}
		});

		// Whenever the filter changes, always go back to the first page
		// this.table.offset = 0;
	}
}
