import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/shared/models/user.model';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupsService } from 'src/app/shared/services/groups.service';
import { AbonnementService } from 'src/app/shared/services/abonnement.service';
import { AddNewAcademyComponent } from '../add-new-academy/add-new-academy.component';
import { MatDialog } from '@angular/material/dialog';
import { Group } from 'src/app/shared/models/group.model';
import { SidebarvisibilityService } from 'src/app/shared/services/sidebarvisibility.service';
import { Academy } from 'src/app/shared/models/academy.model';
import { AcademyService } from 'src/app/shared/services/academy.service';
import { PlayerProfileService } from 'src/app/shared/services/playerProfile.service';

@Component({
  selector: 'app-users-academy',
  templateUrl: './users-academy.component.html',
  styleUrls: ['./users-academy.component.scss']
})
export class UsersAcademyComponent implements OnInit {

  constructor(private visibilityService: SidebarvisibilityService,
    public dialog: MatDialog,
    private groupService: GroupsService,
    private abonnementService: AbonnementService,
    private academyService: AcademyService,
    private route: ActivatedRoute,
    private router: Router,
    private playerProfileService: PlayerProfileService
    ) { }
  usersList: IUser[] = [];
  groupsList: Group[] = [];
  players: any[] = [];
  nbrPlayers: number;
  playerStatus;
  seance;
  academyId;
  currentAcademy: Academy;
  activateLayoutFlag: boolean;
  selectedGroup: Group;
  ngOnInit(): void {
    this.visibilityService.emitData(false);
    this.activateLayoutFlag = false;
    this.academyId = this.route.snapshot.paramMap.get('id');
    this.getAll();

    this.groupService.getAllGroupByAcademyId(this.academyId).subscribe((res: Group[]) => {      
      this.groupsList = res;
      // this.selectedGroup = res[0] ?? new Group();
    });
    this.academyService.getAcademyById(this.academyId).subscribe((res: Academy) => {
      this.currentAcademy = res;
    });

  }

  
  already;
  buttonDisabled = false;
  buttonState = "";
  visible = true;

  showUser(e){
    console.log(e);
    
  }
  onNoClick(){

  }


  openDialog() {
    const dialogRef = this.dialog.open(AddNewAcademyComponent,{
      width: '100vw',
      data: { update: false }
    });

    dialogRef.afterClosed().subscribe((result) => {
    });
  }

  filterByGroup(group){
    this.players = [];

    this.selectedGroup = group;
    this.groupService.getPlayersWithState(group._id).subscribe((res: any[]) => {
         res.map((player) => {
        this.players.push({
          player: player?.player?.player,
          payed : player?.payed
        });
      });
    this.nbrPlayers = this.players?.length;
    },(err) => {
    });
  }

  getAll(){
    this.players = [];
    this.academyService.getPlayersByAcademy(this.academyId).subscribe((res: any[]) => {
      console.log(res);
      
      this.players = res;
      this.selectedGroup = null;
      this.nbrPlayers = this.players.length;
    })
  }

  navigateToProfile(user){
    this.playerProfileService.emitData(user);    
    this.router.navigateByUrl(`/football/app/player-profile/${this.academyId}/${user?.player?._id}`);
  }

  activateLayout(flag: boolean){
    this.activateLayoutFlag = flag;
  }
}
