import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { IOwnerStats } from 'src/app/shared/models/ownerStats.model';
import { AbonnementService } from 'src/app/shared/services/abonnement.service';
import { AcademyService } from 'src/app/shared/services/academy.service';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { SidebarvisibilityService } from 'src/app/shared/services/sidebarvisibility.service';
import { StatsService } from 'src/app/shared/services/stats.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  constructor(private router: Router,private titleService: Title,
    private academyService: AcademyService,
    private activatedRoute: ActivatedRoute,
    private statsService: StatsService,
    private visibilityService: SidebarvisibilityService,
    private abonnementService: AbonnementService,
    private authenticationService: AuthenticationService) { }

    options = {
      backgroundColor: "#00f85c"
    };

  // academyId = localStorage.getItem('academyId');
  playersPayed: any[] = [];
	playersNotPayed: any[] = [];
  nbPayedPlayer: number;
  nbNotPayedPlayer: number;
  academyId: string;
  stats: IOwnerStats = {
    players: 0,coaches: 0, groupes: 0,seances: 0
  };
  
  
  getToken(){
    this.authenticationService.getAllAcademies();
  }

  ngOnInit(): void {
    this.visibilityService.emitData(true);
    this.academyId = this.activatedRoute.snapshot.paramMap.get('id');
    localStorage.setItem('academyId',this.academyId);
    this.titleService.setTitle('Details | GARK');
    this.statsService.statsAcademy(this.academyId).subscribe((res) => {      
    });

    this.abonnementService.checkPayment(this.academyId).subscribe((res: any[]) => {
			for (let index = 0; index < res.length; index++) {
				if (res[index]?.payed){
					this.playersPayed.push(res[index].player);
				}else{
					this.playersNotPayed.push(res[index].player);
				}
			}
      this.nbPayedPlayer = this.playersPayed?.length;
      this.nbNotPayedPlayer = this.playersNotPayed?.length;    
		  });

      this.statsService.statsAcademy(this.academyId).subscribe((res: IOwnerStats) => {      
        this.stats = res;
      })
  }

  openDialog(e) {
    this.router.navigateByUrl(`/football/app/${e}`,{ state: { data: history.state.data } });
  }

  NavigateToAcademies(){
    this.academyService.currentAcademyId.next("");
    this.router.navigateByUrl('/football/app/clubs');
  }

}
