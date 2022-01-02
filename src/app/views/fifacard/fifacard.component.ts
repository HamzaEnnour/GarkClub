import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fifacard',
  templateUrl: './fifacard.component.html',
  styleUrls: ['./fifacard.component.scss']
})
export class FifacardComponent implements OnInit {
  itemImageUrl: string;
  dropDownData: string[] = ['GoldRare','OTW','Flashback','BronzeNonRare','SCREAM','Objective','PlayerMoment',
'Season1Reward','ICONSwaps','ICON','SBC','SBCPREMIUM','EuropaLeague','EuropaLeagueSpecial','BronzeIF','GoldIF',
'SilverIF','UCLCommon','UCLRare','UCLSpecial','UCLRare2','BundesPOTM','EPLPOTM','MLSPOTM','Ligue1POTM',
'LaLigaPOTM','GoldNonRare','SilverNonRare','BronzeRare','SilverRare'];
  selectedItem : string = 'GoldRare';

  color: string = '#000000';
  size: string;
  sizePos: string;
  sizeScore: string;
  sizeName: string;
  constructor() { }

  ngOnInit(): void {
    this.itemImageUrl = "../../../assets/imgs/fifaCard/GoldRare.png";
    this.sizeScore = "18";
    this.sizePos = "22"
    this.size = "32";
    this.sizeName = "30";
  }
  
  selectPattern(value:string){
    this.itemImageUrl = "../../../assets/imgs/fifaCard/"+value+".png";
    this.selectedItem = value;
     
  }

  changeSize(value:string){
    this.size = value; 
  }

  changeNameSize(value:string){
    this.sizeName = value; 
  }

  changeScoreSize(value:string){
    this.sizeScore = value; 
  }
  changePosSize(value:string){
    this.sizePos = value; 
  }
}
