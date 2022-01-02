import { Component, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Title } from '@angular/platform-browser';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html'
})
export class UserComponent implements OnInit, OnDestroy {

  adminRoot = environment.adminRoot;

  constructor(
    private renderer: Renderer2,
    private titleService : Title,
    private _auth: AuthenticationService,
    private router: Router
    ) { }

  ngOnInit() {
    this.titleService.setTitle("S'authentifier | GARK");

    if(this._auth.isAuthenticated    ){
      this.router.navigate([this.adminRoot])
    }
    this.renderer.addClass(document.body, 'background');
    this.renderer.addClass(document.body, 'no-footer');
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'background');
    this.renderer.removeClass(document.body, 'no-footer');
  }

  backHome(){
    this.router.navigateByUrl('/home');
  }
}
