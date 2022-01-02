import { Component, Input, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { PlayerInfoService } from 'src/app/shared/services/player-info.service';
import { StatsService } from 'src/app/shared/services/stats.service';


@Component({
  selector: 'app-player-card',
  templateUrl: './player-card.component.html',
  styleUrls: ['./player-card.component.scss']
})
export class PlayerCardComponent implements OnInit {

  @Input()itemImageUrl: string;
  // @Input()data: any;
  dropDownData: string[] = ['GoldRare','OTW','Flashback','BronzeNonRare','SCREAM','Objective','PlayerMoment',
'Season1Reward','ICONSwaps','ICON','SBC','SBCPREMIUM','EuropaLeague','EuropaLeagueSpecial','BronzeIF','GoldIF',
'SilverIF','UCLCommon','UCLRare','UCLSpecial','UCLRare2','BundesPOTM','EPLPOTM','MLSPOTM','Ligue1POTM',
'LaLigaPOTM','GoldNonRare','SilverNonRare','BronzeRare','SilverRare'];
  selectedItem : string = 'GoldNonRare';

  color: string = '#584848';
  size: string;
  sizePos: string;
  sizeScore: string;
  sizeName: string;
  playerName: string;
  pac: string;
  sho: string;
  pas: string;
  def: string;
  phy: string;
  dri: string;
  mean: string;
  position: string;

  constructor(private playerInfoService: PlayerInfoService,
    private authService: AuthenticationService,
    private statService: StatsService) { }

  ngOnInit(): void {
    
    this.statService.statsPlayer().subscribe((res: any) => {
      console.log(res);
      let review = res.review;
      this.pac = review.PAC;
      this.sho = review.SHO;
      this.pas = review.PAS;
      this.dri = review.DRI;
      this.phy = review.PHY;
      this.def = review.DEF;
      this.mean = review.mean;
      this.position = res.info.position;
    });

    this.authService.getConnectedPlayer().subscribe((res: any) => {
      console.log(res);
      this.playerName = `${res?.user.firstName.toUpperCase()} ${res?.user.lastName[0].toUpperCase()}.`;   
    });

    this.sizeScore = "18";
    this.sizePos = "20"
    this.size = "28";
    this.sizeName = "24";
  }
}
