import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AcademyService } from '../services/academy.service';
import { AuthenticationService } from '../services/authentication.service';
import {map} from 'rxjs/operators';
const adminRoot = environment.adminRoot;

@Injectable({
  providedIn: 'root'
})
export class OwnerGuard implements CanActivate {

  constructor(
    private router: Router,
    private auth: AuthenticationService
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {    
    if(this.auth.isAuthenticatedByOwner){
      console.log("ok");
      
      return true;
    }
    console.log("not ok");
    
    
    return this.router.navigate([this.router.url]);
    }
  }
