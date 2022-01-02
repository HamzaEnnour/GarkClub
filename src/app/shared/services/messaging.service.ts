import { HttpBackend, HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { BehaviorSubject } from 'rxjs'
import { environment } from 'src/environments/environment';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class MessagingService {
  

  currentMessage = new BehaviorSubject(null);
  private httpClient: HttpClient;
  constructor(
    private angularFireMessaging: AngularFireMessaging,
    private authenticationService: AuthenticationService,
    private http: HttpClient,handler: HttpBackend
    ) {
      this.httpClient = new HttpClient(handler);
    // this.angularFireMessaging.messages.subscribe(
    //   (_messaging : AngularFireMessaging) => {
    //     if(_messaging.onMessage){
    //       _messaging.onMessage = _messaging.onMessage.bind(_messaging);
    //     }
    //     if(_messaging.onTokenRefresh){
    //       _messaging.onTokenRefresh = _messaging.onTokenRefresh.bind(_messaging);
    //     }
        
    //   },
    //   (err)=>{}
    // )
  }

  load() {
    this.authenticationService.getConnectedUser().subscribe((res: any) =>{
          let id = res?.user?._id;
    this.authenticationService.getNotificationToken(id).subscribe((res) => {
      console.log(res);
      
      if (res["token"] == "") {
        this.managePushNotificationToken();
      } else {
        const myToken = res["token"];
        this.checkTokenisValid(myToken).subscribe(
          (res) => {
            if (res["failure"] == 1) {
              //refresh token in backend
              this.managePushNotificationToken();
            }
          });
      }
    },(err) => {
      console.log(err);
      
    });
  });
  }

  private managePushNotificationToken() {  
    this.authenticationService.getConnectedUser().subscribe((res: any) =>{
          let id = res?.user?._id;  
    this.requestPermission().subscribe(res => {
      console.log(res);
      
      if (res) {
        this.authenticationService.assignNotificationToken(res as string,id).subscribe(
          (token) => {
          });
      }
    },
    (err)=>{}
    );
    });
  }

  requestPermission() {
    return this.angularFireMessaging.requestToken;
  }

  receiveMessage() {
    this.angularFireMessaging.messages.subscribe(
      (payload) => {
        this.currentMessage.next(payload);
      })
  }

  checkTokenisValid(token){    
    let auth_token = environment.firebase.token;
  let headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${auth_token}`
  });
    // return this.http.post(`https://fcm.googleapis.com/fcm/send`, { "registration_ids" : [ token ] }, { headers :  new HttpHeaders({ 'Authorization' : `key=${environment.firebase.token}` }) });
    return this.httpClient.post(`https://fcm.googleapis.com/fcm/send`, 
    { "registration_ids" : [ token ] }, 
    { headers :  headers});
  }

  private readonly baseUrl = `https://fcm.googleapis.com/fcm/send`;
  sendNotification(titre,msg,tokenTo){
    console.log(tokenTo?.token);
    
    let auth_token = environment.firebase.token;
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });
    let payload = {
      "notification": {
      "title": titre, 
      "body": msg,
      "sender": ""
      },
      "to" : tokenTo?.token
    };   
    return this.httpClient.post(`${this.baseUrl}`,payload, { headers: headers });
}

}

// import { HttpBackend, HttpClient, HttpHeaders } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { AngularFireMessaging } from '@angular/fire/messaging';
// import { BehaviorSubject } from 'rxjs'
// import { environment } from '../../../environments/environment';
// import { AuthenticationService } from './authentication.service';

// @Injectable()
// export class MessagingService {

//   // private readonly baseUrl = `${environment.apiUrl}`;
//   private readonly baseUrl = `https://fcm.googleapis.com/fcm/send`;
//   private httpClient: HttpClient;
//   currentMessage = new BehaviorSubject(null);
// constructor(private angularFireMessaging: AngularFireMessaging,
//   private authenticationService: AuthenticationService,private http : HttpClient,handler: HttpBackend) {
//   this.httpClient = new HttpClient(handler);
//   this.angularFireMessaging.messages.subscribe(
//     (_messaging: AngularFireMessaging) => {
//     _messaging.onMessage = _messaging.onMessage.bind(_messaging);
//     _messaging.onTokenRefresh = _messaging.onTokenRefresh.bind(_messaging);
//   })
// }

// requestPermission() {
//   this.authenticationService.getConnectedUser().subscribe((res: any) =>{
//     let id = res?.user?._id;
//     console.log(id);
//     this.angularFireMessaging.requestToken.subscribe(
//       (token) => {
//       console.log(token);
//                 this.authenticationService.assignNotificationToken(token as string,id).subscribe(
//                   (t) => {
//                   });
//       },
//       (err) => {
//       console.error('Unable to get permission to notify.', err);
//       }
//       );
//   });

// }
// receiveMessage() {
// this.angularFireMessaging.messages.subscribe(
// (payload) => {
// console.log("new message received. ", payload);
// this.currentMessage.next(payload);
// })
// }


// sendNotification(titre,msg,tokenTo){
//   let auth_token = environment.firebase.token;
//   let headers = new HttpHeaders({
//     'Content-Type': 'application/json',
//     'Authorization': `Bearer ${auth_token}`
//   });
//   let payload = {
//     "notification": {
//     "title": titre, 
//     "body": msg,
//     "sender": ""
//     },
//     "to" : tokenTo?.token
//   };   
//   return this.httpClient.post(`${this.baseUrl}`,payload, { headers: headers });
//   }
// }