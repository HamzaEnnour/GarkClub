import { Component, ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ScrollToConfigOptions, ScrollToService } from '@nicky-lenaers/ngx-scroll-to';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-home-layout',
  templateUrl: './home-layout.component.html',
  styleUrls: ['./home-layout.component.scss']
})
export class HomeLayoutComponent implements OnInit {

  constructor(
    private renderer: Renderer2,
    private titleService: Title,
    private scrollToService: ScrollToService,
    public auth: AuthenticationService,
    private router: Router
  ) { }

  showMobileMenu = false;
  userRoot = '/football/user/login';
  adminRoot = environment.adminRoot;

  ngOnInit() {
    this.titleService.setTitle('GARK')
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

  goHome() {
    this.showMobileMenu = false;
    this.router.navigateByUrl('/');
  }
  goContact() {
    this.showMobileMenu = false;
    this.router.navigateByUrl('/contact');
  }
  goAbout() {
    if (this.showMobileMenu) {
      this.showMobileMenu = false;
    }
    // this.router.navigateByUrl('/');
    this.scrollTo('#footer')
    // }else{
    //   this.router.navigateByUrl('/');
    //   this.scrollTo('#footer')
    // }
  }

  goLogin() {
    this.buttonDisabled = true;
    this.buttonState = 'show-spinner';
    if (this.auth.isAuthenticated) {
      this.router.navigateByUrl(`${this.adminRoot}`)
    } else {
      this.router.navigateByUrl('/user/login')
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
