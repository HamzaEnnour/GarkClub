import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/shared/models/user.model';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupsService } from 'src/app/shared/services/groups.service';
import { AddPlayerToGroupComponent } from './add-player-to-group/add-player-to-group.component';
import { CoachService } from 'src/app/shared/services/coach.service';
import { PlayerProfileGroupService } from 'src/app/shared/services/playerProfileGroup.service';
import { Group } from 'src/app/shared/models/group.model';
import { AddSubscriptionDialogComponent } from 'src/app/views/app/dashboards/ecommerce/add-subscription-dialog/add-subscription-dialog.component';
import {DeletePlayerComponent} from './delete-player/delete-player.component';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss']
})
export class PlayersComponent implements OnInit {

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
  selectedItem: any;
  coachPicturePath: string;

  constructor(public dialog: MatDialog,
    private coachService: CoachService,
    private route: ActivatedRoute,
    private router: Router,
    private groupeService: GroupsService,
    private playerProfileGroupService: PlayerProfileGroupService
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
      this.coachPicturePath = this.selectedItem?.coach?.picture || "https://bootdey.com/img/Content/avatar/avatar7.png";
      console.log(this.coachPicturePath);
      
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

  addPlayerToGroup(){
          const dialog = this.dialog.open(AddPlayerToGroupComponent, {
            width: '500px',
            data: { multiple: false, player: this.players,group: this.groupId }
          });
      
          dialog.afterClosed().subscribe((ev: any) => {
            console.log(ev);
            if(ev){
              let newPlayer: any = {
                player: ev["addedPlayer"],
                payed: false
              }
              this.players.push(ev["addedPlayer"]);
              this.players.push(newPlayer);
            }
            
          });
  }

  addSubscription(p) {
		const spentDialog = this.dialog.open(AddSubscriptionDialogComponent, {
			width: '500px',
			data: { create: true, isSpent: false,finance: false, player: p}
		});

		spentDialog.afterClosed().subscribe((res) => {
			if (res) {
				console.log(res);
        this.players.forEach(item => {
          if (item?.player?._id == res?.player?._id) { item.payed = true}
        });
				// this.finances.push(res as Finance)
				// this.getFinanceState();
				// this.getStats();
			}
		});
	}

  delete(e) {
    const dialogRef = this.dialog.open(DeletePlayerComponent, {
      width: '450px',
      data: { player: e, id: this.groupId }
    });

    dialogRef.afterClosed().subscribe((e: IUser) => 
    {
          this.players = this.players.filter(obj => obj?.player?._id != e?._id);
      }, (err) => {
        console.log('Erreur de suppression');
      });
  }

  navigateToProfile(player){
    console.log(player);
    this.playerProfileGroupService.emitData(player);
    this.router.navigateByUrl(`/football/app/profile/${this.academyId}/${player?.player?._id}`);
  }

  navigateToCoachProfile(coach){
    console.log(coach);
    
    this.coachService.emitData(coach);
    this.router.navigateByUrl(`/football/app/coach-profile/${coach?._id}`);
  }
}