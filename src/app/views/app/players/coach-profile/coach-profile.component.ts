import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { CoachService } from 'src/app/shared/services/coach.service';

@Component({
  selector: 'app-coach-profile',
  templateUrl: './coach-profile.component.html',
  styleUrls: ['./coach-profile.component.scss']
})
export class CoachProfileComponent implements OnInit {

  private basePath = '/users';
  url = '';
  selectedMenu: string;
  isImageUploadLoading: boolean = false;
  editMode: boolean = false;
  imageSrc: string;

  constructor(private route: ActivatedRoute,private router: Router,
    private authenticationService: AuthenticationService,
    private notificationsService: NotificationsService,
    private af: AngularFireStorage,
    private coachService: CoachService) { }
  academyId:string;
  coachId:string;
  coach;
  ngOnInit(): void {
    this.selectedMenu = 'profile';
    // this.academyId = this.route.snapshot.paramMap.get('id');
    this.coachId = this.route.snapshot.paramMap.get('id');
    this.coachService.subscriber.subscribe((res) => {
      console.log(res);
      this.coach = res;
      this.imageSrc = this.coach?.picture || "https://bootdey.com/img/Content/avatar/avatar7.png";

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
    
    this.authenticationService.updateUserImage(this.coach?._id,path).subscribe((res) => { 
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

  updateCoach(e){
    console.log(e.value);

        // rightFooted?: number;
        // position?: string;
    let infoCoach: any = {lastName: e.value?.lastName, firstName: e.value?.firstName,
      height: e.value?.height, weight: e.value?.age, age: e.value?.age
    }
    
    this.authenticationService.updateCoachByOwnerInfo(this.coachId,infoCoach).subscribe((res: any) => {
      console.log(res);
      this.notificationsService.create('Succès', "Info mis à jour avec succès", NotificationType.Bare, { theClass: 'outline primary', timeOut: 6000, showProgressBar: false });

    },(err) => {
      this.notificationsService.create('Erreur', "", NotificationType.Bare, { theClass: 'outline primary', timeOut: 6000, showProgressBar: false });
    })

  }
}
