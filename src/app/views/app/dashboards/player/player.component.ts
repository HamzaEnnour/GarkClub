import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TabComponent } from '@syncfusion/ej2-angular-navigations';
import { DarkModeService } from 'src/app/shared/services/dark-mode.service';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { StatsService } from 'src/app/shared/services/stats.service';

import { StarRatingColor } from './star-rating/star-rating.component';
import { GroupsService } from 'src/app/shared/services/groups.service';
import { Abonnement } from 'src/app/shared/models/abonnement.model';

interface PlayerPosition{
  abbreviation: string;
  value: string;
}

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {

  constructor(private statService: StatsService,
    public dialog: MatDialog,
    private _auth : AuthenticationService,
    private groupeService : GroupsService,
    private darkModeService: DarkModeService) { }
  
    positionList: PlayerPosition[] = [
      {abbreviation: "GK", value: "Gardien "},
      {abbreviation: "RB", value: "Défenseur droit"},
      {abbreviation: "CB", value: "Défenseur central"},
      {abbreviation: "LB", value: "Défenseur gauche"},
      {abbreviation: "CDM", value: "Milieu défensif central"},
      {abbreviation: "CM", value: "Milieu central"},
      {abbreviation: "CAM", value: "Milieu offensif central"},
      {abbreviation: "LM", value: "Milieu gauche"},
      {abbreviation: "RM", value: "Milieu droit"},
      {abbreviation: "LW", value: "Ailier gauche"},
      {abbreviation: "RW", value: "Ailier droit"},
      {abbreviation: "CF", value: "Attaquant"},
      {abbreviation: "ST", value: "Buteur"}
    ]

  public tabClass: string = 'tab-class'; 
  public primaryXAxis: Object;
  public title: string;
  public primaryYAxis: Object;
  public data: Object[];
  background : string
  isDarkModeActive: boolean;
  position: string;
  age: string;
  poids: string;
  hauteur: string;
  equipe: string;
  pied: string;
  numero: string;
  nbOfGoals: number;
  nbOfAssists: number;
  allSeances: string;
  seancesPlayed: string;
  seanceRatio: string;
  seanceToday: string;
  seanceWeek: string;
  seanceMonth: string;
    abonnement: Abonnement;
  rating:number = 3;
    starCount:number = 5;
    starColor:StarRatingColor = StarRatingColor.accent;
    starColorP:StarRatingColor = StarRatingColor.primary;
    starColorW:StarRatingColor = StarRatingColor.warn;
  ngOnInit(): void {
    this.statService.statsPlayer().subscribe((res: any) => {
      console.log(res);
      this.abonnement = res?.abonnement;
      let review = res.review;
      this.rating = Math.ceil(((review?.mean) / 100) * 5);
      this.nbOfGoals = review?.nbOfGoals;
      this.nbOfAssists = review?.nbOfAssist;
      this.data = [{ x: 'PAC', y: review.PAC }, { x: 'DEF', y: review.DEF },{ x: 'DRI', y: review.DRI },
      { x: 'SHO', y: review.SHO }, { x: 'PAS', y: review.PAS }, { x: 'PHY', y: review.PHY }];
      
      this.position = this.positionList.find(p => p.abbreviation == res.info.position)?.value;
      this.age = res.info.age;
      this.equipe = res.info.Team;
      this.hauteur = res.info.height;
      this.poids = res.info.weight;
      this.numero = res.info.shirtNumber;
      this.pied = (res.info.rightFooted) ? "Droitier" : "Gaucher";
      this.allSeances = res.allSeances;
      this.seancesPlayed = res.seancesPlayed;
      this.seanceRatio = (Math.floor(Number(this.seancesPlayed)/Number(this.allSeances) * 100)) ?
      Math.floor(Number(this.seancesPlayed)/Number(this.allSeances) * 100).toString() : "0";
      this.seanceToday = res.seances.today;
      this.seanceWeek = res.seances.thisWeek;
      this.seanceMonth = res.seances.thisMonth;
    });

    

      this.primaryXAxis = {
          title: 'Capacité',
          valueType: 'Category',
          labelPlacement: 'OnTicks',
          };
      this.primaryYAxis = {
          minimum: 0, maximum: 100, interval: 20,
          title: 'Value',
          };

      this.title = 'Statistiques';        
      
  }

  @ViewChild('element') tabInstance: TabComponent;

  // defined the array of data
  // public data2: string[] = ['Badminton', 'Basketball', 'Cricket', 'Golf', 'Hockey', 'Rugby'];
  // set placeholder text to ComboBox input element
  // public text: string = 'Select a game';

  
  onRatingChanged(rating){
    // this.rating = rating;
  }
}