import { Component, Inject, Input, OnInit, Output } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import * as EventEmitter from 'events';
import { EventC } from 'src/app/shared/models/event.model';
import { EventReview } from 'src/app/shared/models/eventReview.model';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { EventReviewService } from 'src/app/shared/services/event-review.service';
import { EventCalendarService } from 'src/app/shared/services/eventCalendar.service';
import { MessagingService } from 'src/app/shared/services/messaging.service';
import { StarRatingColor } from '../../player/star-rating/star-rating.component';
import {Notification} from 'src/app/shared/models/notification.model';


@Component({
  selector: 'app-form-coach',
  templateUrl: './form-coach.component.html',
  styleUrls: ['./form-coach.component.scss']
})
export class FormCoachComponent implements OnInit {

  user: any;
  connectedCoach: any;
  eventId:string;
  groupId;
  visible: boolean = false;
  resMobile = {
    pac: 75,
    def:75,
    pas:75,
    dri:75,
    phy:75,
    sho:75,
    buts: 0,
    assist: 0
  };


  ratingPAC:number = 3;
  ratingDEF:number = 3;
  ratingPAS:number = 3;
  ratingDRI:number = 3;
  ratingPHY:number = 3;
  ratingSHO:number = 3;
  starCount:number = 5;
  starColor:StarRatingColor = StarRatingColor.accent;
  starColorP:StarRatingColor = StarRatingColor.primary;
  starColorW:StarRatingColor = StarRatingColor.warn;

  constructor(private eventReview: EventReviewService,
    private eventCalendar: EventCalendarService,
    private firestore: AngularFirestore,
    private messagingService: MessagingService,
    private authenticationService: AuthenticationService,
    private notificationsService: NotificationsService,
    public dialogRef: MatDialogRef<FormCoachComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }


  ngOnInit(): void {
    this.user = this.data["user"];
 
  }
  formatLabel(value: number) {
    if (value >= 100) {
      return Math.round(value / 100) + '%';
    }

    return value;
  }

  onSubmit(){
    this.eventCalendar.subscriber.subscribe((res:any) => {

      let event: EventC = {
        startTime: res.StartTime,
        endTime: res.EndTime,
        _id: res.Id,
        groupe: res.Group
      }

      let eventReview: EventReview = {
        pace: this.resMobile.pac,
        defence: this.resMobile.def,
        drible: this.resMobile.dri,
        passe: this.resMobile.pas,
        physique: this.resMobile.phy,
        shot: this.resMobile.sho,
        nbOfAssist: this.resMobile.assist,
        nbOfGoals: this.resMobile.buts,
        player: this.user,
        played:true,
        seance: event
      };

      this.authenticationService.getConnectedUser().subscribe((res: any) => {

        this.connectedCoach = res?.user;
      this.eventReview.createEvent(eventReview,event?._id,this.user._id).subscribe((res) => {
        console.log(res);
        this.notificationsService.create('Succès', "Evaluation terminée", NotificationType.Bare, { theClass: 'outline primary', timeOut: 2000, showProgressBar: false });
        this.visible = false;
        this.user.reviewd = true;

          this.send(`${this.connectedCoach?.firstName} ${this.connectedCoach?.lastName} vous a attribué une note
          pour la seance de ${event?.startTime}`,this.connectedCoach?._id,this.user?._id)

        this.dialogRef.close();
      },(err) => {
        this.notificationsService.create('Erreur', "Erreur", NotificationType.Bare, { theClass: 'outline primary', timeOut: 2000, showProgressBar: false });
        this.dialogRef.close();
      });
    });
  });

    

  }
    
  getPACValueStar(e){
    this.resMobile.pac = Number(e / (5/ 100));
    this.ratingPAC = e;
  }
  getDEFValueStar(e){
    this.resMobile.def = Number(e / (5/ 100));
    this.ratingDEF = e;
  }
  getPASValueStar(e){
    this.resMobile.pas = Number(e / (5/ 100));
    this.ratingPAS = e;
  }
  getDRIValueStar(e){
    this.resMobile.dri = Number(e / (5/ 100));
    this.ratingDRI = e;
  }
  getPHYValueStar(e){
    this.resMobile.phy = Number(e / (5/ 100));
    this.ratingPHY = e;

  }
  getSHOValueStar(e){
    this.resMobile.sho = Number(e / (5/ 100));
    this.ratingSHO = e;
  }  


  getPACValue(e){
    this.resMobile.pac = e.value;
  }
  getDEFValue(e){
    this.resMobile.def = e.value;
  }
  getPASValue(e){
    this.resMobile.pas = e.value;
  }
    getDRIValue(e){
      this.resMobile.dri = e.value;
    }
    getPHYValue(e){
    }
    getSHOValue(e){
      this.resMobile.sho = e.value;
    }

    reset(){
      this.resMobile = {
        pac: 75,
        def:75,
        pas:75,
        dri:75,
        phy:75,
        sho:75,
        buts: 0,
        assist: 0
      }
    }

    absent(e){
      if(e.checked == false){
        this.visible = false;
      }else {
        this.visible = true;
      }
      console.log(e.checked);
      
    }



    createPolicy(payload: Notification,receiverId: string){
      return this.firestore.collection(`messages/${receiverId}/notifications/`).add(payload);
    }
  
    send(message: string,senderId: string,receiverId: string){
      let payload: Notification = {msg : message, sender: senderId, receiver: receiverId,
        timestamp : new Date().getTime(),read: 0};
  
          this.authenticationService.getNotificationToken(receiverId).subscribe((token) => {
    
        this.messagingService.sendNotification("Evaluation",message,token).subscribe((res) => {
              
            },(err) => {
              console.error(err);
              
            });
            this.createPolicy(payload,receiverId);
  
          });
    }
}
