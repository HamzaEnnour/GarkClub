import { Component, OnInit, OnDestroy, HostListener, ChangeDetectorRef } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { SidebarService, ISidebar } from './sidebar.service';
import menuItems, { IMenuItem } from 'src/app/constants/menu';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import {RoleService} from 'src/app/shared/services/role.service';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
const adminRoot = environment.adminRoot;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {
  menuItems: IMenuItem[] = menuItems;
  selectedParentMenu = '';
  viewingParentMenu = '';
  currentUrl: string;

  sidebar: ISidebar;
  subscription: Subscription;
  closedCollapseList = [];
  isMobile: boolean = false;
  academyId: string;
  constructor(
    private roleService: RoleService,
    private auth: AuthenticationService,
    private router: Router,
    private sidebarService: SidebarService,
    private activatedRoute: ActivatedRoute
  ) {
    this.subscription = this.sidebarService.getSidebar().subscribe(
      (res) => {
        this.sidebar = res;
      },
      (err) => {
        console.error(`An error occurred: ${err.message}`);
      }
    );
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => this.activatedRoute),
        map((route) => {
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        })
      )
      .subscribe((event) => {
        const path = this.router.url.split('?')[0];
        const paramtersLen = Object.keys(event.snapshot.params).length;
        const pathArr = path
          .split('/')
          .slice(0, path.split('/').length - paramtersLen);
        this.currentUrl = pathArr.join('/');
      });

    router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        const { containerClassnames } = this.sidebar;
        this.selectMenu();
        this.toggle();
        this.sidebarService.setContainerClassnames(
          0,
          containerClassnames,
          this.sidebar.selectedMenuHasSubItems
        );
        window.scrollTo(0, 0);
      });
  }
  userRole: string;

  subscriptionAcademy: Subscription;

  ngOnInit(): void {
     // this.academyId = this.activatedRoute.snapshot.paramMap.get('id');
     this.academyId = localStorage.getItem('academyId');
     // this.academyId = this.router.url.split('/')[this.router.url.split('/').length - 1];
     
    //  this.userRole = localStorage.getItem('role');
     this.auth.getConnectedUser().subscribe((res: any)=> {
      this.userRole = res?.user?.role;
      if (this.userRole == 'owner') {
         
        this.menuItems[0].to = `${adminRoot}/details/${this.academyId}`;
        this.menuItems[1].to = `${adminRoot}/events/${this.academyId}`;
        this.menuItems[2].to = `${adminRoot}/equipment/${this.academyId}`;
        this.menuItems[3].to = `${adminRoot}/groups/${this.academyId}`;
        this.menuItems[4].to = `${adminRoot}/dashboards/financial/${this.academyId}`;
        console.log(this.menuItems);

      } else if (this.userRole == 'coach') {          
        this.menuItems[0].to = `${adminRoot}/dashboards/coach/${this.academyId}`;
        this.menuItems[1].to = `${adminRoot}/dashboards/calendar/${this.academyId}`;
        this.menuItems[2].to = `${adminRoot}/dashboards/coach-compte`;
        this.menuItems[2].icon = `flaticon-user`;
        this.menuItems[2].label = `Profile`;
        this.menuItems[3].to = `${adminRoot}/dashboards/coach-groups/${this.academyId}`;
        this.menuItems[4].visible = false;
        // this.menuItems[4].to = `${adminRoot}/dashboards/coach-compte`;
      }
      else if (this.userRole == 'player') {           
        this.menuItems[0].to = `${adminRoot}/dashboards/player`;
        this.menuItems[1].to = `${adminRoot}/dashboards/player-calendar`;
       this.menuItems[2].to = `${adminRoot}/dashboards/coach-profil-rating`;
        this.menuItems[2].icon = `flaticon-user`;
        this.menuItems[2].label = `Mon coach`;
        this.menuItems[3].visible = false;
        this.menuItems[4].visible = false;
       //  this.menuItems[4].to = `${adminRoot}/dashboards/player-compte`;
      }
     })
    //  console.log(this.userRole);
         
       // });
   // }
     this.isMobile = window.screen.width < 600 ? true : false;
       setTimeout(() => {
         this.selectMenu();
         const { containerClassnames } = this.sidebar;
         const nextClasses = this.getMenuClassesForResize(containerClassnames);
         this.sidebarService.setContainerClassnames(
           0,
           nextClasses.join(' '),
           this.sidebar.selectedMenuHasSubItems
         );
         this.isCurrentMenuHasSubItem();
       }, 100);
  }

  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe();
    }
    if (this.subscriptionAcademy){
      this.subscriptionAcademy.unsubscribe();
    }
  }

  selectMenu() {
    this.selectedParentMenu = this.findParentInPath(this.currentUrl) || '';
    this.isCurrentMenuHasSubItem();
  }

  findParentInPath(path) {
    const foundedMenuItem = this.menuItems.find((x) => x.to === path);
    if (!foundedMenuItem) {
      if (path?.split('/').length > 1) {
        const pathArr = path.split('/');
        return this.findParentInPath(
          pathArr.slice(0, pathArr.length - 1).join('/')
        );
      } else {
        return undefined;
      }
    } else {
      return path;
    }
  }

  isCurrentMenuHasSubItem() {
    const { containerClassnames } = this.sidebar;

    const menuItem = this.menuItems.find(
      (x) => x.to === this.selectedParentMenu
    );
    const isCurrentMenuHasSubItem =
      menuItem && menuItem.subs && menuItem.subs.length > 0 ? true : false;
    if (isCurrentMenuHasSubItem !== this.sidebar.selectedMenuHasSubItems) {
      if (!isCurrentMenuHasSubItem) {
        this.sidebarService.setContainerClassnames(
          0,
          containerClassnames,
          false
        );
      } else {
        this.sidebarService.setContainerClassnames(
          0,
          containerClassnames,
          true
        );
      }
    }
    return isCurrentMenuHasSubItem;
  }

  changeSelectedParentHasNoSubmenu(parentMenu: string) {    
    const { containerClassnames } = this.sidebar;
    this.selectedParentMenu = parentMenu;
    this.viewingParentMenu = parentMenu;
    this.sidebarService.changeSelectedMenuHasSubItems(false);
    this.sidebarService.setContainerClassnames(0, containerClassnames, false);
  }

  openSubMenu(event: { stopPropagation: () => void }, menuItem: IMenuItem) {
    if (event) {
      event.stopPropagation();
    }
    const { containerClassnames, menuClickCount } = this.sidebar;

    const selectedParent = menuItem.to;
    const hasSubMenu = menuItem.subs && menuItem.subs.length > 0;
    this.sidebarService.changeSelectedMenuHasSubItems(hasSubMenu);
    if (!hasSubMenu) {
      this.viewingParentMenu = selectedParent;
      this.selectedParentMenu = selectedParent;
      this.toggle();
    } else {
      const currentClasses = containerClassnames
        ? containerClassnames.split(' ').filter((x) => x !== '')
        : '';

      if (!currentClasses.includes('menu-mobile')) {
        if (
          currentClasses.includes('menu-sub-hidden') &&
          (menuClickCount === 2 || menuClickCount === 0)
        ) {
          this.sidebarService.setContainerClassnames(
            3,
            containerClassnames,
            hasSubMenu
          );
        } else if (
          currentClasses.includes('menu-hidden') &&
          (menuClickCount === 1 || menuClickCount === 3)
        ) {
          this.sidebarService.setContainerClassnames(
            2,
            containerClassnames,
            hasSubMenu
          );
        } else if (
          currentClasses.includes('menu-default') &&
          !currentClasses.includes('menu-sub-hidden') &&
          (menuClickCount === 1 || menuClickCount === 3)
        ) {
          this.sidebarService.setContainerClassnames(
            0,
            containerClassnames,
            hasSubMenu
          );
        }
      } else {
        this.sidebarService.addContainerClassname(
          'sub-show-temporary',
          containerClassnames
        );
      }
      this.viewingParentMenu = selectedParent;
    }
  }

  toggle() {
    const { containerClassnames, menuClickCount } = this.sidebar;
    const currentClasses = containerClassnames
      .split(' ')
      .filter((x) => x !== '');
    if (currentClasses.includes('menu-sub-hidden') && menuClickCount === 3) {
      this.sidebarService.setContainerClassnames(
        2,
        containerClassnames,
        this.sidebar.selectedMenuHasSubItems
      );
    } else if (
      currentClasses.includes('menu-hidden') ||
      currentClasses.includes('menu-mobile')
    ) {
      if (!(menuClickCount === 1 && !this.sidebar.selectedMenuHasSubItems)) {
        this.sidebarService.setContainerClassnames(
          0,
          containerClassnames,
          this.sidebar.selectedMenuHasSubItems
        );
      }
    }
  }

  toggleCollapse(id: string) {
    if (this.closedCollapseList.includes(id)) {
      this.closedCollapseList = this.closedCollapseList.filter((x) => x !== id);
    } else {
      this.closedCollapseList.push(id);
    }
  }

  getMenuClassesForResize(classes: string) {
    let nextClasses = classes.split(' ').filter((x: string) => x !== '');
    const windowWidth = window.innerWidth;

    if (windowWidth < this.sidebarService.menuHiddenBreakpoint) {
      nextClasses.push('menu-mobile');
    } else if (windowWidth < this.sidebarService.subHiddenBreakpoint) {
      nextClasses = nextClasses.filter((x: string) => x !== 'menu-mobile');
      if (
        nextClasses.includes('menu-default') &&
        !nextClasses.includes('menu-sub-hidden')
      ) {
        nextClasses.push('menu-sub-hidden');
      }
    } else {
      nextClasses = nextClasses.filter((x: string) => x !== 'menu-mobile');
      if (
        nextClasses.includes('menu-default') &&
        nextClasses.includes('menu-sub-hidden')
      ) {
        nextClasses = nextClasses.filter(
          (x: string) => x !== 'menu-sub-hidden'
        );
      }
    }
    return nextClasses;
  }

  @HostListener('document:click', ['$event'])
  handleDocumentClick(event) {
    this.viewingParentMenu = '';
    this.selectMenu();
    this.toggle();
  }

  @HostListener('window:resize', ['$event'])
  handleWindowResize(event) {

    this.isMobile = event.target.innerWidth < 600 ? true : false;

    if (event && !event.isTrusted) {
      return;
    }
    const { containerClassnames } = this.sidebar;
    const nextClasses = this.getMenuClassesForResize(containerClassnames);
    this.sidebarService.setContainerClassnames(
      0,
      nextClasses.join(' '),
      this.sidebar.selectedMenuHasSubItems
    );
    this.isCurrentMenuHasSubItem();
  }

  menuClicked(e: MouseEvent) {
    e.stopPropagation();
  }
}
