import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { IUser } from 'src/app/shared/models/user.model';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { PlayerProfileGroupService } from 'src/app/shared/services/playerProfileGroup.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  selectedMenu: string;
  private basePath = '/users';
  url = '';

  isImageUploadLoading: boolean = false;
  editMode: boolean = false;
  constructor(private route: ActivatedRoute,private router: Router,private af: AngularFireStorage,
    private authenticationService: AuthenticationService,
    private notificationsService: NotificationsService,
    private playerProfileGroupService: PlayerProfileGroupService) { }
  academyId:string;
  playerId:string;
  imageSrc: string;
  player;
  ngOnInit(): void {
    this.selectedMenu = 'profile';
    this.academyId = this.route.snapshot.paramMap.get('id');
    this.playerId = this.route.snapshot.paramMap.get('player');

    this.playerProfileGroupService.subscriber.subscribe((res: any) => {
      console.log(res);
      this.player = res?.player;
      this.imageSrc = this.player?.picture || "https://bootdey.com/img/Content/avatar/avatar7.png";
      console.log(this.imageSrc);
      
    })
  }

  chnageActive(s: string){
    this.selectedMenu = s;
  }

  navigateToPlayerList(){
    // this.router.navigateByUrl(`/football/app/playeracademy/${this.academyId}`);
  }


  async imageSelected(evt) {

    if (!evt.target.files) {
      return;
    }
    this.isImageUploadLoading = true;
    const image = evt.target.files[0];

    const filePath = `${this.basePath}/${Math.random()}${image?.name}`;    //path at which image will be stored in the firebase storage
      const snap = await this.af.upload(filePath, image);    //upload task
      this.getUrl(snap);
      
  }

  private async getUrl(snap) {
    const url = await snap.ref.getDownloadURL();
    this.url = url;  //store the URL
    console.log(this.url);
    let path: any = {picture: this.url};
    console.log(this.player);
    console.log(this.playerId);
    
    
    this.authenticationService.updateUserImage(this.player?._id,path).subscribe((res) => { 
      this.isImageUploadLoading = false;
        this.notificationsService.create('Succès', "Photo de profile mis à jour avec succès", NotificationType.Bare, { theClass: 'outline primary', timeOut: 6000, showProgressBar: false });
        this.imageSrc = path?.picture || "https://bootdey.com/img/Content/avatar/avatar7.png";
    },(err) => {
      this.isImageUploadLoading = false;
      this.notificationsService.create('Erreur', "Une erreur a survenue lors du téléchargement de votre photo de profile", NotificationType.Bare, { theClass: 'outline primary', timeOut: 6000, showProgressBar: false });
    });
  }


  editInfo(){
    this.editMode = !this.editMode
  }

  updatePlayer(e){
    console.log(e.value);

        // rightFooted?: number;
        // position?: string;
    let infoPlayer: any = {lastName: e.value?.lastName, firstName: e.value?.firstName,
      height: e.value?.height, weight: e.value?.age, age: e.value?.age,
      Team: e.value?.Team, shirtNumber: e.value?.shirtNumber,rightFooted: e.value?.rightFooted
    }
    
    this.authenticationService.updatePlayerByOwnerInfo(this.playerId,infoPlayer).subscribe((res: any) => {
      console.log(res);
      this.notificationsService.create('Succès', "Info mis à jour avec succès", NotificationType.Bare, { theClass: 'outline primary', timeOut: 6000, showProgressBar: false });

    },(err) => {
      this.notificationsService.create('Erreur', "", NotificationType.Bare, { theClass: 'outline primary', timeOut: 6000, showProgressBar: false });
    })

  }
}
