import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { Academy } from 'src/app/shared/models/academy.model';
import { AcademyService } from 'src/app/shared/services/academy.service';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { MessagingService } from 'src/app/shared/services/messaging.service';
import { PlayerProfileService } from 'src/app/shared/services/playerProfile.service';
import { SidebarvisibilityService } from 'src/app/shared/services/sidebarvisibility.service';
import {PayerDialogComponent} from './payer-dialog/payer-dialog.component'
import {Notification} from 'src/app/shared/models/notification.model';

@Component({
  selector: 'app-profil-player',
  templateUrl: './profil-player.component.html',
  styleUrls: ['./profil-player.component.scss']
})
export class ProfilPlayerComponent implements OnInit {

  selectedMenu: string;
  private basePath = '/users';
  url = '';

  isImageUploadLoading: boolean = false;
  editMode: boolean = false;
  imageSrc: string;
  show: boolean = false;
  startTime: Date;
  endTime: Date;
  frais: number = 0;
  expire: Date;

  constructor(private route: ActivatedRoute,private router: Router,
    private messagingService: MessagingService,
    private firestore: AngularFirestore,
    private af: AngularFireStorage,
    private authenticationService: AuthenticationService,
    private notificationsService: NotificationsService,
    private academyService: AcademyService,
    public dialog: MatDialog,
    private visibilityService: SidebarvisibilityService,
    private playerProfileService: PlayerProfileService) { }
  academyId:string;
  currentAcademy: Academy;
  playerId:string;
  player;
  status;
  ngOnInit(): void {
    this.visibilityService.emitData(false);
    this.startTime = new Date();
    this.endTime = new Date(new Date().setMonth(new Date().getMonth()+1));
    this.selectedMenu = 'profile';
    this.academyId = this.route.snapshot.paramMap.get('id');
    this.playerId = this.route.snapshot.paramMap.get('player');

    this.playerProfileService.subscriber.subscribe((res: any) => {
      console.log(res);
      this.player = res?.player;
      this.expire = res?.expire;
      this.imageSrc = this.player?.picture || "https://bootdey.com/img/Content/avatar/avatar7.png";
      this.status = res?.payed;
    });

    this.academyService.getAcademyById(this.academyId).subscribe((res : Academy) => {
      this.currentAcademy = res;
      console.log(this.currentAcademy);
      
    })
  }

  chnageActive(s: string){
    this.selectedMenu = s;
  }

  navigateToPlayerList(){
    this.router.navigateByUrl(`/football/app/playeracademy/${this.academyId}`);
  }

  Payer(){
    const dialogRef = this.dialog.open(PayerDialogComponent,{
      width: '650px',
      data: { player: this.player, academy: this.currentAcademy,
        frais: this.frais, debut: this.startTime,fin: this.endTime  }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if(result?.payed){
        this.status = true;        
        this.send(`Votre abonnement a été renouvelé jusqu'à le ${this.endTime.toLocaleDateString()}`,this.currentAcademy?.owner._id,this.playerId)
        this.expire = this.endTime
      }
      console.log(result);     
      
    });
  }

  createPolicy(payload: Notification,receiverId: string){
    return this.firestore.collection(`messages/${receiverId}/notifications/`).add(payload);
  }

  send(message: string,senderId: string,receiverId: string){
    let payload: Notification = {msg : message, sender: senderId, receiver: receiverId,
      timestamp : new Date().getTime(),read: 0};

        this.authenticationService.getNotificationToken(receiverId).subscribe((token) => {
          console.log(token);
          
      this.messagingService.sendNotification("Abonnement",message,token).subscribe((res) => {
            
          },(err) => {
            console.error(err);
            
          });
          this.createPolicy(payload,receiverId);

        });
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
    this.editMode = !this.editMode;
  }

  updatePlayer(e){

    console.log(e.value);

        // rightFooted?: number;
        // position?: string;
    let infoPlayer: any = {lastName: e.value?.lastName, firstName: e.value?.firstName,
      height: e.value?.height, weight: e.value?.age, age: e.value?.age,
      Team: e.value?.Team, shirtNumber: e.value?.shirtNumber, rightFooted: e.value?.rightFooted
    }
    
    this.authenticationService.updatePlayerByOwnerInfo(this.playerId,infoPlayer).subscribe((res: any) => {
      console.log(res);
      this.notificationsService.create('Succès', "Info mis à jour avec succès", NotificationType.Bare, { theClass: 'outline primary', timeOut: 6000, showProgressBar: false });

    },(err) => {
      this.notificationsService.create('Erreur', "", NotificationType.Bare, { theClass: 'outline primary', timeOut: 6000, showProgressBar: false });
    })

  }

  // showCam(){
  //   this.show = true;
  // }

  // hideCam(){
  //   this.show = false;
  // }

  startTimeHasChanged(event) {
    this.startTime = event as Date;
    // this.endTime = this.startTime.addM(90);

  }

  endTimeHasChanged(event) {
    this.endTime = event as Date;
  }
}
