import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/shared/models/user.model';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupsService } from 'src/app/shared/services/groups.service';
import { CoachService } from 'src/app/shared/services/coach.service';
import { Group } from 'src/app/shared/models/group.model';
import { PlayerProfileService } from 'src/app/shared/services/playerProfile.service';
import { PlayerProfileGroupService } from 'src/app/shared/services/playerProfileGroup.service';


@Component({
  selector: 'app-players-profile',
  templateUrl: './players-profile.component.html',
  styleUrls: ['./players-profile.component.scss']
})
export class PlayersProfileComponent implements OnInit {

  usersList: IUser[] = [];
  players: any[] = [];
  playerStatus;
  seance; 
  ListGroups: Group[] = [];
  groupId: string;
  academyId: string;
  already;
  buttonDisabled = false;
  buttonState = "";
  visible = true;
  isMobile: boolean = false;
  selectedItem: IUser;

  constructor(public dialog: MatDialog,
    private coachService: CoachService,
    private route: ActivatedRoute,
    private router: Router,
    private playerProfileService: PlayerProfileService,
    private playerProfileGroupService: PlayerProfileGroupService,
    private groupeService: GroupsService
    ) { }

  ngOnInit(): void {
    
    this.groupId = this.route.snapshot.paramMap.get('id');
    this.academyId = this.route.snapshot.paramMap.get('academy');

    this.groupeService.getPlayersByGroupId(this.groupId).subscribe((res: IUser[]) => {
      this.players = res || [];
      console.log(this.players);
      
    });

    this.groupeService.selectedGroup.subscribe((res: any) => {
      this.selectedItem = res;
      console.log(this.selectedItem);
      
    })
    
    if (window.screen.width < 815) {
            this.isMobile = true;     
            try {
              (<HTMLElement>document.getElementById('_nav')).style.display = "none";
              (<HTMLElement>document.querySelector(".e-toolbar-right")).style.display = "none";
            } catch (e) {
              try {
                (<HTMLElement>document.querySelector(".e-toolbar-right")).style.display = "none";
                setTimeout(() => {
                  (<HTMLElement>document.getElementById('_nav')).style.display = "none";
                }, 200)
              } catch (e) {
                setTimeout(() => {
                  try {
                    (<HTMLElement>document.getElementById('_nav')).style.display = "none";
                  } catch (ec) { }
                  try {
                    (<HTMLElement>document.querySelector(".e-toolbar-right")).style.display = "none";
                  } catch (ee) { }
                }, 200)
              }
            }
          }
  }

  showUser(e){
    console.log(e);
  }

  navigateToProfile(player){    
    this.academyId = localStorage.getItem('academyId');
    let p = {player : player}
    // this.playerProfileService.emitData(p);
    // this.router.navigateByUrl(`/football/app/player-profile/${this.academyId}/${player?._id}`);

    this.playerProfileGroupService.emitData(p);
    this.router.navigateByUrl(`/football/app/profile/${this.academyId}/${player?.player?._id}`);
  }
}
