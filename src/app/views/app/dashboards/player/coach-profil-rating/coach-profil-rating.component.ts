import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { GroupsService } from 'src/app/shared/services/groups.service';
import { CoachReviewService } from 'src/app/shared/services/coachReview.service';
import { CoachReview } from 'src/app/shared/models/coachReview.model';

import { StarRatingColor } from '../star-rating/star-rating.component';
import { NotificationsService, NotificationType } from 'angular2-notifications';

@Component({
  selector: 'app-coach-profil-rating',
  templateUrl: './coach-profil-rating.component.html',
  styleUrls: ['./coach-profil-rating.component.scss']
})
export class CoachProfilRatingComponent implements OnInit {


  rating:number = 3;
  starCount:number = 5;
  starColor:StarRatingColor = StarRatingColor.accent;
  starColorP:StarRatingColor = StarRatingColor.primary;
  starColorW:StarRatingColor = StarRatingColor.warn;

  constructor(private _auth : AuthenticationService,
    private coachReviewService: CoachReviewService,
    private route: ActivatedRoute,private router: Router,
    private notificationsService: NotificationsService,
    private groupeService : GroupsService) { }
    selectedMenu: string;
    academyId:string;
    playerId:string;
    currentCoach: any;
    flagReview: boolean = false;
    noteCoach: number = 0;

  ngOnInit(): void {
    
    this.selectedMenu = 'profile';
    this.academyId = this.route.snapshot.paramMap.get('id');
    this.playerId = this.route.snapshot.paramMap.get('player');
    this._auth.getConnectedUser().subscribe((u: any) => {

    this.groupeService.getCoachByPlayerId(u?.user?._id).subscribe((res: any) => {
      console.log(res);
      this.currentCoach = res;
      this.checkIfCoachReview(this.currentCoach?._id);
    });
    
  });
  

  }

  chnageActive(s: string){
    this.selectedMenu = s;
  }

  navigateToDashboard(){
    this.router.navigateByUrl(`/football/app/dashboards/player`);
  }

  onRatingChanged(rating){
    this.rating = rating;
  }

  rateCoach(){
    let review: CoachReview = {note: this.rating, coach: this.currentCoach }    
    this.coachReviewService.addReview(review).subscribe((res) => {
      this.notificationsService.create('Succès', "Coach noté avec succès",NotificationType.Bare, { theClass: 'outline primary', timeOut: 2000, showProgressBar: false })
    });
  }

  getCoachRating(){
    this.coachReviewService.getReviewsByCoach().subscribe((res) => {
      console.log(res);
      
    });
  }

  checkIfCoachReview(id){
    this.coachReviewService.checkIfReviewed(id).subscribe((res: any) => {
      console.log(res);
      if(res != null){
        this.flagReview = true;
        this.noteCoach = res?.note;
      }
    })
  }
}
