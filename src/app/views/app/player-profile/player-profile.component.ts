import { Component, Input, OnInit } from '@angular/core';
import { PlayerInfoService } from 'src/app/shared/services/player-info.service';

@Component({
  selector: 'app-player-profile',
  templateUrl: './player-profile.component.html',
  styleUrls: ['./player-profile.component.scss']
})
export class PlayerProfileComponent implements OnInit {

  itemImageUrl: string;
  dropDownData: string[] = ['GoldRare','OTW','Flashback','BronzeNonRare','SCREAM','Objective','PlayerMoment',
'Season1Reward','ICONSwaps','ICON','SBC','SBCPREMIUM','EuropaLeague','EuropaLeagueSpecial','BronzeIF','GoldIF',
'SilverIF','UCLCommon','UCLRare','UCLSpecial','UCLRare2','BundesPOTM','EPLPOTM','MLSPOTM','Ligue1POTM',
'LaLigaPOTM','GoldNonRare','SilverNonRare','BronzeRare','SilverRare'];
  @Input()selectedItem : string = 'GoldRare';
  @Input() selectedPlayer: any;
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
  constructor(private playerInfoService: PlayerInfoService) { }

  ngOnInit(): void {
    this.selectTopPlayer();
    this.playerInfoService.subscriber.subscribe((p: any) =>{      
      this.playerName = `${p?.player?.firstName} ${p?.player?.lastName[0].toUpperCase()}.`;
      this.pac = p?.review.PAC;
      this.sho = p?.review.SHO;
      this.pas = p?.review.PAS;
      this.dri = p?.review.DRI;
      this.phy = p?.review.PHY;
      this.def = p?.review.DEF;
      this.mean = p?.review?.mean ?? ""
      this.position = p?.player?.position ?? "";
    })
    this.itemImageUrl = "../../../assets/imgs/fifaCard/GoldRare.png";
    this.sizeScore = "18";
    this.sizePos = "20"
    this.size = "30";
    this.sizeName = "24";
  }

  selectTopPlayer(){
    this.playerName = `${this.selectedPlayer?.player?.firstName} ${this.selectedPlayer?.player?.lastName[0].toUpperCase()}.`;
    this.pac = this.selectedPlayer.review.PAC;
    this.sho = this.selectedPlayer.review.SHO;
    this.pas = this.selectedPlayer.review.PAS;
    this.dri = this.selectedPlayer.review.DRI;
    this.phy = this.selectedPlayer.review.PHY;
    this.def = this.selectedPlayer.review.DEF;
    this.mean = this.selectedPlayer.review?.mean ?? ""
    this.position = this.selectedPlayer.player?.position ?? "";
  }
}
