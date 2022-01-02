import { Component, ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ScrollToConfigOptions, ScrollToService } from '@nicky-lenaers/ngx-scroll-to';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from '../shared/services/authentication.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  constructor(
    private renderer: Renderer2,
    private titleService: Title,
    private scrollToService: ScrollToService,
    public auth: AuthenticationService,
    private router: Router,
    private meta: Meta
  ) { }

  showMobileMenu = false;
  year: number = 2020;
  userRoot = '/football/user/login';
  adminRoot = environment.adminRoot;

  ngOnInit() {
    this.titleService.setTitle('GARK');
    this.meta.updateTag({name: 'desciption', content: ''})
    this.year = new Date().getFullYear();
    this.isMobile = window.screen.width < 527 ? true : false;
  }
  ngOnDestroy() {
    this.renderer.removeClass(document.body, "no-footer");
  }

  isMobile: boolean = false;
  @HostListener("window:resize", ["$event"])
  onResize(event) {
    this.isMobile = window.screen.width < 527 ? true : false;
  }

  @HostListener("window:click", ["$event"])
  onClick(event) {
    this.showMobileMenu = false;
  }

  @HostListener("window:scroll", ["$event"])
  onScroll(event) {
    this.showMobileMenu = false;
  }

  buttonDisabled = false;
  buttonState = '';

  goLogin() {
    this.buttonDisabled = true;
    this.buttonState = 'show-spinner';
    if (this.auth.isAuthenticated) {
      this.router.navigateByUrl(this.adminRoot)
    } else {
      this.router.navigateByUrl('/football/user/login')
    }

  }

  scrollTo(target) {
    const config: ScrollToConfigOptions = {
      target,
      offset: -150
    };
    this.scrollToService.scrollTo(config);
  }

}
