import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/user.model';
import {UserService} from '../../../shared/services/user.service';
import { Query, DataManager,Predicate } from '@syncfusion/ej2-data';
import { MatDialog } from '@angular/material/dialog';
import { AddCoachComponent } from './add-coach/add-coach.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  dataSource: User[];
  isMobile: boolean = false;
  constructor(private userService: UserService,public dialog: MatDialog) { }

  roles: string[] = ['Coach','Joueur','User'];
  ngOnInit(): void {
    if (window.screen.width < 815) {
      this.isMobile = true;     
      try {
        (<HTMLElement>document.getElementById('_nav')).style.display = "none";
        (<HTMLElement>document.querySelector(".e-toolbar-right")).style.display = "none";
      } catch (e) {
        try {
          (<HTMLElement>document.querySelector(".e-toolbar-right")).style.display = "none";
          setTimeout(() => {
            (<HTMLElement>document.getElementById('_nav')).style.display = "none";
          }, 200)
        } catch (e) {
          setTimeout(() => {
            try {
              (<HTMLElement>document.getElementById('_nav')).style.display = "none";
            } catch (ec) { }
            try {
              (<HTMLElement>document.querySelector(".e-toolbar-right")).style.display = "none";
            } catch (ee) { }
          }, 200)
        }
      }
    }

    this.userService.getAllUsers().subscribe((u: User[])=>{
      console.log(u);
      
      this.dataSource = u;
    })
  }


  public searchData: { [key: string]: Object }[] = [
    { Name: 'Australia', Code: 'AU' },
    { Name: 'Bermuda', Code: 'BM' },
    { Name: 'Canada', Code: 'CA' },
    { Name: 'Cameroon', Code: 'CM' },
    { Name: 'Denmark', Code: 'DK' },
    { Name: 'France', Code: 'FR' },
    { Name: 'Finland', Code: 'FI' },
    { Name: 'Germany', Code: 'DE' },
    { Name: 'Greenland', Code: 'GL' },
    { Name: 'Hong Kong', Code: 'HK' },
    { Name: 'India', Code: 'IN' },
    { Name: 'Italy', Code: 'IT' },
    { Name: 'Japan', Code: 'JP' },
    { Name: 'Mexico', Code: 'MX' },
    { Name: 'Norway', Code: 'NO' },
    { Name: 'Poland', Code: 'PL' },
    { Name: 'Switzerland', Code: 'CH' },
    { Name: 'United Kingdom', Code: 'GB' },
    { Name: 'United States', Code: 'US' }];
    query0;
    // maps the appropriate column to fields property
    public fields: Object = { value: "Code" , text:"Name"};
    // set the placeholder to the AutoComplete input
    public text: string = "Find a country";
    public itemTemplate:string= "<span><span class='name'>${Name}</span>-<span class ='code'>${Code}</span></span>";
    public onFiltering (e)
    {
      e.preventDefaultAction=true;
      var predicate = new Predicate('Name', 'contains', e.text);
          predicate = predicate.or('Code', 'contains', e.text);
       var query = new Query();
   //frame the query based on search string with filter type.
     query = (e.text != "") ? query.where(predicate) : query;
   //pass the filter data source, filter query to updateData method.
   this.query0 = query
     e.updateData(this.searchData, query);
    }

    addReservationDialog(){
      const dialog = this.dialog.open(AddCoachComponent, {
        width: '500px',
        // data: { multiple: false, terrain: this.terrainSelected }
      });
  
      dialog.afterClosed().subscribe((res) => {
        if (res) {
          // this.fetchReservationData();
        }
      })
    }
    openAddReservationMobile(){
      const dialog = this.dialog.open(AddCoachComponent, {
        width: '500px',
        // data: { multiple: false, terrain: this.terrainSelected }
      });
  
      dialog.afterClosed().subscribe((res) => {
        if (res) {
          // this.fetchReservationData();
        }
      })
    }
    details(e){}
    edit(e){}
    delete(e){}
    open(e){}
}
