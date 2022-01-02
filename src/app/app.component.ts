import { Component, OnInit, Renderer2, AfterViewInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { Injectable } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { environment } from 'src/environments/environment';
import { DarkModeService } from 'src/app/shared/services/dark-mode.service'
import { Ajax } from '@syncfusion/ej2-base';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
@Injectable()
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {

  mySubscription;

  constructor(
    private darkModeService: DarkModeService,
    private renderer: Renderer2,
    el: ElementRef,
    private router : Router,
    private loaderService : NgxUiLoaderService
    ) {

      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.mySubscription = this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
           // Trick the Router into believing it's last link wasn't previously loaded
           this.router.navigated = false;
        }
      }); 

    }
    isDarkModeActive: boolean;
  ngOnInit() {

    this.router.events.subscribe(val => {
      if(val instanceof NavigationStart){
        this.loaderService.start();
      }
      if(val instanceof NavigationEnd){
        this.loaderService.stop();
      }
    });
    
    this.isDarkModeActive = this.darkModeService.getInitialMode();
    let element =<HTMLElement>document.getElementById('mode');
    if(this.isDarkModeActive){      
      element.classList.add('dark');
    }else {
      element.classList.remove('dark');
    }
    this.darkModeService.subscriber.subscribe((res: boolean) => {
      this.isDarkModeActive = res;
    });
  }

  ngAfterViewInit() {
    // this.isDarkModeActive = (localStorage.getItem('gark-themecolor') == 'light.greenlime') ? false : true;
    
    
    setTimeout(() => {
      this.renderer.addClass(document.body, 'show');
    }, 1000);
    setTimeout(() => {
      this.renderer.addClass(document.body, 'default-transition');
    }, 1500);
  }

  ngOnDestroy(){
    if (this.mySubscription) {
      this.mySubscription.unsubscribe();
    }
  }
}
