import { Component, Input, OnInit } from '@angular/core';
import { EquipmentModel } from 'src/app/shared/models/equipment.model';
import { IOwnerStats } from 'src/app/shared/models/ownerStats.model';
import { EquipmentsService } from 'src/app/shared/services/equipments.service';
import { EventsService } from 'src/app/shared/services/events.service';
import { StatsService } from 'src/app/shared/services/stats.service';

@Component({
  selector: 'app-sortable-statistics-row',
  templateUrl: './sortable-statistics-row.component.html'
})
export class SortableStatisticsRowComponent implements OnInit {

  @Input() type: string;
  @Input() academyId: string;

  constructor(
    private reservationService: EventsService,
    private statsService: StatsService,
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
  stats: IOwnerStats = {
    players: 0,coaches: 0, groupes: 0,seances: 0
  };

  ngOnInit() {
    this.statsService.statsAcademy(this.academyId).subscribe((res: IOwnerStats) => {      
      this.stats = res;
    })
    this.currentMonth = this.monthNames[(new Date()).getMonth()]
    
    if(this.type == 'stats'){
      this.equipmentService.getEquipmentByAcademyId(this.academyId).subscribe(
        (res: EquipmentModel[]) =>{
          this.equipments = res;
          this.isLoading = false;
        });
    }
  }

}
