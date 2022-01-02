import { Component, OnInit, Input } from '@angular/core';
import { ICoachStats } from 'src/app/shared/models/ownerStats.model';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { PlayerInfoService } from 'src/app/shared/services/player-info.service';
import { StatsService } from 'src/app/shared/services/stats.service';
import { StarRatingColor } from 'src/app/views/app/dashboards/player/star-rating/star-rating.component';


@Component({
  selector: 'app-best-players',
  templateUrl: './best-players.component.html',
  styleUrls: ['./best-players.component.scss']
})
export class BestPlayersComponent implements OnInit {

  rating:number;
  starCount:number = 5;
  starColor:StarRatingColor = StarRatingColor.accent;
  starColorP:StarRatingColor = StarRatingColor.primary;
  starColorW:StarRatingColor = StarRatingColor.warn;

  @Input() class = '';
  selectedPlayer: any;
  selectedIndex: number = 0;
  constructor(
    private _auth : AuthenticationService,
    private statService: StatsService,
    private playerInfoService: PlayerInfoService
  ) { }

  tops: Array<any>= new Array<any>();
  totlaReservation : number = 0;
  stats: ICoachStats = {
    players: 0,academies: 0, groupes: 0,seances: {
      today: 0, thisWeek: 0, thisMonth: 0
    }
  }

  ngOnInit() {
    this.statService.statCoach().subscribe((res: ICoachStats) => {
      this.selectedPlayer = res?.bestPlayers[0] ?? "";
      this.rating = Math.ceil(((this.selectedPlayer?.review?.mean) / 100) * 5);
      this.stats = res;
      for (let index = 0; index < res.bestPlayers.length; index++) {
        this.tops.push(res.bestPlayers[index]); 
      }
    });
  }

  showInfo(i,e){
    this.selectedIndex = i;
    this.rating = Math.ceil(((e?.review?.mean) / 100) * 5);
    console.log(this.rating);
    
    this.playerInfoService.emitData(e);
  }

  getValueStar(e){
    // this.rating = e;
  }  


}
