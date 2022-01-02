import { Component, Input, OnInit } from '@angular/core';
import { StatsService } from 'src/app/shared/services/stats.service';
import { EquipmentModel } from 'src/app/shared/models/equipment.model';
import { ICoachStats, IOwnerStats } from 'src/app/shared/models/ownerStats.model';
import { EquipmentsService } from 'src/app/shared/services/equipments.service';
import { EventsService } from 'src/app/shared/services/events.service';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-coach',
  templateUrl: './coach.component.html',
  styleUrls: ['./coach.component.scss']
})
export class CoachComponent implements OnInit {

  constructor(private statService: StatsService,
    private _auth : AuthenticationService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private equipmentService: EquipmentsService
  ) { }
  
  countToday;
  countMonth;
  countWeek;

  priceDay = 0;
  priceMonth = 0;
  priceWeek = 0;

  percentToday = 0;
  percentWeek = 0;
  percentMonth = 0;

  percentPriceToday = 0;
  percentPriceWeek = 0;
  percentPriceMonth = 0;
  isLoading: boolean = true;
  currentMonth;
  monthNames = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
    "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
  ];
  equipments: EquipmentModel[] = [];
  stats: ICoachStats = {
    players: 0,academies: 0, groupes: 0,seances: {
      today: 0, thisWeek: 0, thisMonth: 0
    }
  };
  academyId: string;// = localStorage.getItem('academyId');
  ngOnInit() {
    this.academyId = this.activatedRoute.snapshot.paramMap.get('id');
      this.statService.statCoach().subscribe((res: ICoachStats) => {
        this.stats = res;
        console.log(res);
        
      });
    this.currentMonth = this.monthNames[(new Date()).getMonth()]
    
    this.equipmentService.getEquipmentByAcademyId(this.academyId).subscribe(
      (res: EquipmentModel[]) =>{
        this.equipments = res;
        this.isLoading = false;
        });
  }

  NavigateToAcademies(){
    this.router.navigateByUrl('/football/app/dashboards/coach-clubs');
  }
  
}
