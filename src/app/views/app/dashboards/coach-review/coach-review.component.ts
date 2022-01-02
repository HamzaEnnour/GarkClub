import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/shared/models/user.model';
import {EventReviewService} from 'src/app/shared/services/event-review.service';
import { ActivatedRoute } from '@angular/router';
import { EventsService } from 'src/app/shared/services/events.service';
import { FormCoachComponent } from './form-coach/form-coach.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-coach-review',
  templateUrl: './coach-review.component.html',
  styleUrls: ['./coach-review.component.scss']
})
export class CoachReviewComponent implements OnInit {

  constructor(public dialog: MatDialog,
    private eventService: EventsService,
    private route: ActivatedRoute,
    private eventReviewService: EventReviewService
    ) { }
  usersList: IUser[] = [];
  players: IUser[] = [];
  seance;
  eventId;
  event;
  StartDate =  new Date(new Date().setHours(new Date().getHours() + 1, 0, 0));
  EndDate = new Date(new Date().setHours(new Date().getHours() + 2, 0, 0));
  public tabClass: string = 'tab-class';
  ngOnInit(): void {
    this.eventId = this.route.snapshot.paramMap.get('id');
    this.eventService.subscriber.subscribe((res: any) => {
      console.log(typeof(res?.StartTime));
      this.event = res;
      this.StartDate = res?.StartTime
      // console.log(typeof(this.startTime));
    })
      this.eventReviewService.checkReview(this.eventId).subscribe((res: any[]) => {
        console.log(res);    
        for (let index = 0; index < res.length; index++) {
          let p: IUser = res[index].player;
          p.reviewd = res[index].reviewed;
          this.players.push(p)
        }
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

  evaluer(user){
    console.log(user);
    const dialogRef = this.dialog.open(FormCoachComponent,{
      width: '100vw',
      data: { user: user }
    });

    dialogRef.afterClosed().subscribe((result) => {
    });
    
  }
}
