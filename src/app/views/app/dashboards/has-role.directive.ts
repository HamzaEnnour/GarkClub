import { Directive, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { Subject } from 'rxjs';
import { Role, User } from 'src/app/shared/models/user.model';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';

@Directive({
  selector: '[appHasRole]'
})
export class HasRoleDirective implements OnInit, OnDestroy {
  // the role the user must have 
  @Input() appHasRole: string;

  stop$ = new Subject();
  role;
  isVisible = false;

  /**
   * @param {ViewContainerRef} viewContainerRef 
   * 	-- the location where we need to render the templateRef
   * @param {TemplateRef<any>} templateRef 
   *   -- the templateRef to be potentially rendered
   * @param {RolesService} rolesService 
   *   -- will give us access to the roles a user has
   */
  constructor(
    private viewContainerRef: ViewContainerRef,
    private templateRef: TemplateRef<any>,
    private rolesService: AuthenticationService
  ) {}

  ngOnInit() {
    //  We subscribe to the roles$ to know the roles the user has
    this.rolesService.getConnectedUser().subscribe((user: any) => {
      this.role = user.user.role;      
      if (!(this.role == this.appHasRole)) {
        this.viewContainerRef.clear();
      }else{        
        this.viewContainerRef.createEmbeddedView(this.templateRef);
      }
    });
  }
  
  // Clear the subscription on destroy
  ngOnDestroy() {
    this.stop$.next();
  }
}
