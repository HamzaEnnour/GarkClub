import { Component, OnInit, OnDestroy, HostListener, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { SidebarService, ISidebar } from 'src/app/containers/layout/sidebar/sidebar.service';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { MessagingService } from 'src/app/shared/services/messaging.service';
import { AngularFirestore } from '@angular/fire/firestore';
import {Notification} from 'src/app/shared/models/notification.model';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';


const adminRoot = environment.adminRoot;

@Component({
  selector: 'app-app',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit, OnDestroy {
  sidebar: ISidebar;
  subscription: Subscription;
  visible = true;
  constructor(private messagingService: MessagingService,
    private authenticationService: AuthenticationService,
    private firestore: AngularFirestore,
    private sidebarService: SidebarService,
    private titleService: Title
  ) {
  }


  ngAfterViewInit() {
    
  }

  createPolicy(payload: Notification,receiverId: string){
    return this.firestore.collection(`messages/${receiverId}/notifications/`).add(payload);
  }

  send(message: string,senderId: string,receiverId: string){
    let payload: Notification = {msg : message, sender: senderId, receiver: receiverId,
      timestamp : new Date().getTime(),read: 0};

        this.authenticationService.getNotificationToken(receiverId).subscribe((token) => {
          console.log(token);
          
      this.messagingService.sendNotification("Test",message,token).subscribe((res) => {
            console.log(res);
            
          },(err) => {
            console.error(err);
            
          });
          this.createPolicy(payload,receiverId);

        });
  }

  message;
  
  ngOnInit() {
    this.messagingService.requestPermission()
    this.messagingService.receiveMessage()
    this.message = this.messagingService.currentMessage
  
    this.titleService.setTitle("Tableau de bord");
    this.subscription = this.sidebarService.getSidebar().subscribe(
      res => {
        this.sidebar = res;
      },
      err => {
        console.error(`An error occurred: ${err.message}`);
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  @HostListener('window:scroll', ['$event'])
  onScroll(event: any) {
  }
}
