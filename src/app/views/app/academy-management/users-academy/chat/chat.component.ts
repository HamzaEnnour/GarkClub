
import { ChangeDetectorRef,AfterViewChecked, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import { AngularFirestore } from '@angular/fire/firestore';
import {Message} from 'src/app/shared/models/message.model';
import { AcademyService } from 'src/app/shared/services/academy.service';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { Academy } from 'src/app/shared/models/academy.model';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, AfterViewChecked,OnDestroy {
  messages: Message[];
  messages2: Message[];
  conv: Message[];
  academyId: string;
  players: any[];
  coaches: any[];
  owner: any;
  flag: boolean = true;
  isMobile: boolean = false;
  fillerNav: string[] = [];
  fillerNavCoach: string[] = [];
  lastMessage: string = "";
  currentId: string;// = "608db9994b06503c083c6641";
  constructor(private firestore: AngularFirestore,private academyService: AcademyService,
    private authenticationService: AuthenticationService,
    changeDetectorRef: ChangeDetectorRef, media: MediaMatcher){
      this.mobileQuery = media.matchMedia('(max-width: 600px)');
      this._mobileQueryListener = () => changeDetectorRef.detectChanges();
      this.mobileQuery.addListener(this._mobileQueryListener);
  }
selectedItem;

  ngOnInit() {
    if (window.screen.width < 815) {
      this.isMobile = true;     
    }

    this.authenticationService.getConnectedUser().subscribe((res: any) => {
      this.currentId = res?.user?._id;
    this.academyId = localStorage.getItem('academyId');
    this.scrollToBottom();
    this.academyService.getPlayersByAcademy(this.academyId).subscribe((res: any[])=> {
      console.log(this.currentId);
        this.players = res?.filter(r => r?.player?._id != this.currentId);
    for (let index = 0; index < this.players.length; index++) {
      this.fillerNav.push(this.players[index]?.player?.firstName+' ' +this.players[index]?.player?.lastName);
    }
    });
     
    this.academyService.coachesByAcademy(this.academyId).subscribe((res: any[])=> {
      console.log(res);
      if (res?.length > 0){
        this.selectedItem = res[0];
        if(this.selectedItem){
          this.selectUser(this.selectedItem);
        }
      }
      this.coaches = res;
      
      this.coaches = res?.filter(r => r?._id != this.currentId);
      for (let index = 0; index < this.coaches.length; index++) {
        this.fillerNavCoach.push(this.coaches[index]?.firstName+' ' +this.coaches[index]?.lastName);
      }
      });

      this.academyService.getAcademyById(this.academyId).subscribe((academy: Academy) => {
        this.owner = academy?.owner;
        console.log(this.owner);
        console.log(this.owner?._id == this.currentId);
        
        if(this.owner?._id == this.currentId){
          this.flag = false;
        }
        
      })
    })
  }

  ngAfterViewChecked() {        
    this.scrollToBottom();        
} 

  getMyMsg(selectedUserId: string,currentId) {
    return this.firestore.collection(`messages/${currentId}/msg`
    ,ref => ref.where(`receiver`,"==",selectedUserId).orderBy("timestamp")).snapshotChanges();
  }

  getSenderMsg(senderId,currentId) {
    console.log(this.selectedItem?._id);
    
    return this.firestore.collection(`messages/${senderId}/msg`
    ,ref => ref.where(`receiver`,"==",currentId).orderBy("timestamp")).snapshotChanges();
  }

    createPolicy(payload: Message,senderId: string,receiverId: string){
      return this.firestore.collection(`messages/${senderId}/msg`).add(payload);
    }

    send(message: string,senderId: string,receiverId: string){
      let payload: Message = {msg : message, sender: senderId, receiver: receiverId,timestamp : new Date().getTime()};

      this.createPolicy(payload,senderId,receiverId);
    }
  
selectUser(user: any){
  this.authenticationService.getConnectedUser().subscribe((res: any) => {
    this.currentId = res?.user?._id;

  this.scrollToBottom();
  this.conv = null;
  this.selectedItem = user;
  console.log(user);
  console.log(user?._id);
  this.getSenderMsg(user?._id,this.currentId)
  .subscribe(data => {
    console.log(data);
    this.messages2 = data
    .map((e: any) => {
      return {
            id: e.payload.doc.id,
            ...e.payload.doc.data()
          }  as Message;
    });


    this.getMyMsg(user?._id,this.currentId).subscribe(data => {
      console.log(data);
      console.log(this.currentId);
      this.messages = data
      .map((e: any) => {
        return {
              id: e.payload.doc.id,
              ...e.payload.doc.data()
            }  as Message;
      });

      this.conv = this.messages.concat(this.messages2).sort((n1,n2) => n1.timestamp - n2.timestamp);
      this.lastMessage = this.conv[this.conv?.length - 1]?.msg;
    });

  });
  });
}


message: string;
submit(message){
  this.send(message,this.currentId,this.selectedItem?._id);
  this.message = null;
  
}
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  @ViewChild('list') listObj: any;
  @ViewChild('textbox') textboxEle: any;
  public data: Object[] = [
    {
      text: "Jenifer",
      contact: "Hi",
      id: "1",
      avatar: "",
      pic: "pic01", chat: "sender"
    },
    { text: "Amenda", contact: "Hello", id: "2", avatar: "A", pic: "", chat: "receiver" },
    {
      text: "Jenifer",
      contact: "What Knid of application going to launch",
      id: "4",
      avatar: "",
      pic: "pic02", chat: "sender"
    },
    {
      text: "Amenda ",
      contact: "A knid of Emergency broadcast App",
      id: "5",
      avatar: "A",
      pic: "", chat: "receiver"
    },
    {
      text: "Jacob",
      contact: "Can you please elaborate",
      id: "6",
      avatar: "",
      pic: "pic04", chat: "sender"
    },
  ];
  public fields = { text: "Name" };

  public btnClick() {
    let value = this.textboxEle.nativeElement.value;
    this.listObj.addItem([{ text: "Amenda", contact: value, id: "2", avatar: "A", pic: "", chat: "receiver" }]);
    this.textboxEle.nativeElement.value = "";
    this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
  }


  scrollToBottom(): void {
    try {
        this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch(err) { }                 
}
  






mobileQuery: MediaQueryList;

//fillerNav: string[];// = Array.from({length: 50}, (_, i) => `Nav Item ${i + 1}`);

private _mobileQueryListener: () => void;

ngOnDestroy(): void {
  this.mobileQuery.removeListener(this._mobileQueryListener);
}
}
