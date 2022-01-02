import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { User } from 'src/app/shared/models/user.model';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { MessagingService } from 'src/app/shared/services/messaging.service';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html'
})
export class AnalyticsComponent implements OnInit {

  constructor(   
    private titleService: Title,
    private authenticationService: AuthenticationService,
    private messagingService: MessagingService,
  ) { }


  options = {
    backgroundColor: "#00f85c"
  };


  ngOnInit() {
    this.titleService.setTitle('Tableau de bord | GARK');
  }
  
  getToken(){
    this.authenticationService.getAllAcademies();
  }
}
