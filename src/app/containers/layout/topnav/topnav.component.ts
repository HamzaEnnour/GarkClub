import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Subscription } from 'rxjs';
import { SidebarService, ISidebar } from '../sidebar/sidebar.service';
import { Router } from '@angular/router';
import { LangService, Language } from 'src/app/shared/lang.service';
import { environment } from 'src/environments/environment';
import { setThemeColor } from 'src/app/utils/util';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { DarkModeService } from 'src/app/shared/services/dark-mode.service';
import {SidebarvisibilityService} from 'src/app/shared/services/sidebarvisibility.service'
import { Ajax } from '@syncfusion/ej2-base';
import { AcademyService } from 'src/app/shared/services/academy.service';
import { AngularFirestore } from '@angular/fire/firestore';
import {Notification} from 'src/app/shared/models/notification.model';

@Component({
  selector: 'app-topnav',
  templateUrl: './topnav.component.html',
})
export class TopnavComponent implements OnInit, OnDestroy {
  adminRoot = environment.adminRoot;
  compteLink: string;
  notifications: Notification[];
  sidebar: ISidebar;
  unreadNotification: number;
  subscription: Subscription;
  displayName = 'GARK';
  languages: Language[];
  currentLanguage: string;
  isSingleLang;
  isFullScreen = false;
  isDarkModeActive: boolean;
  searchKey = '';
  isMobile: boolean = false;
  sidebarVisiblity: boolean = true;
  currentId: string;// = "6063886b83f7945cdc9dc179";

  constructor(
    private darkModeService: DarkModeService,
    private sidebarService: SidebarService,
    private firestore: AngularFirestore,
    private router: Router,
    private langService: LangService,
    private _auth : AuthenticationService,
    private visibilityService: SidebarvisibilityService
  ) {
    this.languages = this.langService.supportedLanguages;
    this.currentLanguage = this.langService.languageShorthand;
    this.isSingleLang = this.langService.isSingleLang;
  }

  onDarkModeChange(event) {
    
    this.isDarkModeActive = !this.isDarkModeActive;
    let color = (!this.isDarkModeActive) ? environment.defaultColor : environment.darkTheme;
    localStorage.setItem(environment.themeColorStorageKey, color);
    setThemeColor(color);
    this.darkModeService.emitData(this.isDarkModeActive);
    let element =<HTMLElement>document.getElementById('mode');
    if(this.isDarkModeActive){      
      element.classList.add('dark');
    }else {
      element.classList.remove('dark');
    }
    this.darkModeService.emitData(this.isDarkModeActive);
    // this.loadDarkModeCSS(this.isDarkModeActive);
  }

  loadDarkModeCSS(IsDarkMode){
    let theme = (IsDarkMode) ? 'material-dark' : 'material';
    let ajax: Ajax = new Ajax('assets/styles/' + theme + '.min.css', 'GET', true);
      ajax.send().then((result: any) => {
        let styleTag = document.getElementById('theme');
        styleTag.innerHTML=`/*${theme}*/` + result;
      });
  }

  fullScreenClick() {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen();
    }
  }


  getNotifications(selectedUserId: string) {
    return this.firestore.collection(`messages/${selectedUserId}/notifications`
    ,ref => ref.where(`receiver`,"==",selectedUserId).orderBy("timestamp","desc").limit(10)).snapshotChanges();
  }

  @HostListener('document:fullscreenchange', ['$event'])
  handleFullscreen(event) {
    if (document.fullscreenElement) {
      this.isFullScreen = true;
    } else {
      this.isFullScreen = false;
    }
  }

  onLanguageChange(lang) {
    this.langService.language = lang.code;
    this.currentLanguage = this.langService.languageShorthand;
  }

   ngOnInit() {
    this.visibilityService.subscriber.subscribe((res: boolean) => {
      this.sidebarVisiblity = res;
    });
    // this.academyService.currentAcademyId.subscribe((id: string) => {
    //   console.log(id);
      // let id = localStorage.getItem('academyId');

      this._auth.getConnectedUser().subscribe((res: any) => {
        let role = res?.user?.role;
        if (role == 'player'){
          this.compteLink = `dashboards/player-compte`;
         }else if (role == 'coach'){
          this.compteLink = `dashboards/coach-compte`;
         }else {
          this.compteLink = `compte/`;
         }
      });
      
    // })
     console.log(this.compteLink);
     
    // this.compteLink = (localStorage.getItem('role') == 'player') ? 'dashboards/player-compte' : 'compte';
  if (window.screen.width < 815) {
  this.isMobile = true;
  }
  this.isDarkModeActive = this.darkModeService.getInitialMode();  
    let element =<HTMLElement>document.getElementById('mode');
    if(this.isDarkModeActive){      
      element.classList.add('dark');
    }else {
      element.classList.remove('dark');
    }


    this._auth.getConnectedUser().subscribe();

    this._auth.getAuthInfo().subscribe(res => {
      this.displayName = res?.firstName;

    });
    
    this.subscription = this.sidebarService.getSidebar().subscribe(
      (res) => {
        this.sidebar = res;
      },
      (err) => {
      }
    );
    // this.loadDarkModeCSS(this.isDarkModeActive);

    this._auth.getConnectedUser().subscribe((res: any) => {
      this.currentId = res?.user?._id;
      this.getNotifications(this.currentId).subscribe(data => {
        console.log(this.currentId);
        
        this.notifications = data
        .map((e: any) => {
          return {
                id: e.payload.doc.id,
                ...e.payload.doc.data()
              }  as Notification;
        });
        console.log(this.notifications);
        this.unreadNotification = this.notifications.filter(n => n.read == 0).length;
      });
    });
    
  }

  updateState(){
    const docRef = this.firestore.collection(`messages/${this.currentId}/notifications`).get().toPromise();
    docRef.then((f)=> {
      f.forEach((c) => {
        console.log(c);
        c.ref.set({read : 1}, { merge: true })
      });
    });
  }

  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }

  menuButtonClick = (
    e: { stopPropagation: () => void },
    menuClickCount: number,
    containerClassnames: string
  ) => {
    if (e) {
      e.stopPropagation();
    }

    setTimeout(() => {
      const event = document.createEvent('HTMLEvents');
      event.initEvent('resize', false, false);
      window.dispatchEvent(event);
    }, 350);

    this.sidebarService.setContainerClassnames(
      ++menuClickCount,
      containerClassnames,
      this.sidebar.selectedMenuHasSubItems
    );
  };

  mobileMenuButtonClick = (
    event: { stopPropagation: () => void },
    containerClassnames: string
  ) => {
    if (event) {
      event.stopPropagation();
    }
    this.sidebarService.clickOnMobileMenu(containerClassnames);
  };

  onSignOut() {
    this._auth.signOut();
  }

  chat(){
    this.router.navigateByUrl('/football/app/chat-chat')
  }

  searchKeyUp(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.search();
    } else if (event.key === 'Escape') {
      const input = document.querySelector('.mobile-view');
      if (input && input.classList) {
        input.classList.remove('mobile-view');
      }
      this.searchKey = '';
    }
  }

  searchAreaClick(event) {
    event.stopPropagation();
  }
  searchClick(event) {
    if (window.innerWidth < environment.menuHiddenBreakpoint) {
      let elem = event.target;
      if (!event.target.classList.contains('search')) {
        if (event.target.parentElement.classList.contains('search')) {
          elem = event.target.parentElement;
        } else if (
          event.target.parentElement.parentElement.classList.contains('search')
        ) {
          elem = event.target.parentElement.parentElement;
        }
      }

      if (elem.classList.contains('mobile-view')) {
        this.search();
        elem.classList.remove('mobile-view');
      } else {
        elem.classList.add('mobile-view');
      }
    } else {
      this.search();
    }
    event.stopPropagation();
  }

  search() {
    if (this.searchKey && this.searchKey.length > 1) {
      this.router.navigate([this.adminRoot + '/pages/miscellaneous/search'], {
        queryParams: { key: this.searchKey.toLowerCase().trim() },
      });
      this.searchKey = '';
    }
  }

  @HostListener('document:click', ['$event'])
  handleDocumentClick(event) {
    const input = document.querySelector('.mobile-view');
    if (input && input.classList) {
      input.classList.remove('mobile-view');
    }
    this.searchKey = '';
  }

  addAcademy(){
    this.router.navigateByUrl('/football/app/clubs');
  }
}
