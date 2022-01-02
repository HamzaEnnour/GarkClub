import { Component, OnInit, Input } from '@angular/core';
import profileStatuses, { IProfileStatus } from 'src/app/data/profile-statuses';
import { ReservationService } from 'src/app/shared/services/reservation.service';
import {PlayerInfoService} from 'src/app/shared/services/player-info.service';
import { StatsService } from 'src/app/shared/services/stats.service';
import { StarRatingColor } from 'src/app/views/app/dashboards/player/star-rating/star-rating.component';
@Component({
  selector: 'app-profile-statuses',
  templateUrl: './profile-statuses.component.html',
  styleUrls: ['./profile-statuses.scss']
})
export class ProfileStatusesComponent implements OnInit {

  @Input() class = '';
  @Input() academyId: string;
  data: IProfileStatus[] = profileStatuses;
  selectedPlayer: any;
  selectedIndex: number = 0;

  rating:number = 2;
  starCount:number = 5;
  starColor:StarRatingColor = StarRatingColor.accent;
  starColorP:StarRatingColor = StarRatingColor.primary;
  starColorW:StarRatingColor = StarRatingColor.warn;


  constructor(
    private statsService: StatsService,
    private playerInfoService: PlayerInfoService
  ) { }

  tops: Array<any>= new Array<any>();
  totlaReservation : number = 0;
  ngOnInit() {
    this.statsService.statsAcademy(this.academyId).subscribe((res: any) => {
      this.selectedPlayer = res?.bestPlayers[0] ?? "";
      this.rating = Math.ceil(((this.selectedPlayer?.review?.mean) / 100) * 5);
      for (let index = 0; index < res.bestPlayers.length; index++) {        
        this.tops.push(res.bestPlayers[index]); 
      }
    });
  }

  showInfo(i,e){
    this.selectedIndex = i;
    this.rating = Math.ceil(((e?.review?.mean) / 100) * 5);
    this.playerInfoService.emitData(e);
  }

  getValueStar(e){
    // this.rating = e;
  }  

}
