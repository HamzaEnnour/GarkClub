import { LOCALE_ID, NgModule } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { SharedModule } from 'src/app/shared/shared.module';
import { LayoutContainersModule } from 'src/app/containers/layout/layout.containers.module';
import { SortablejsModule } from 'ngx-sortablejs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PharesComponent } from './phares/phares.component';
import { BoutiqueComponent } from './boutique/boutique.component';
import { CreateTerrainComponent } from './boutique/create-terrain-dialog/create-terrain.component';
import { BootstrapModule } from 'src/app/components/bootstrap/bootstrap.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { ComponentsStateButtonModule } from 'src/app/components/state-button/components.state-button.module';
import { ComponentsDatePickerModule } from 'src/app/components/date-picker/date-picker.module';

import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { ShowTerrainComponent } from './boutique/show-terrain/show-terrain.component';
import { ImageDialogComponent } from './boutique/show-terrain/image-dialog/image-dialog.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import {MatFormFieldModule} from '@angular/material/form-field';
import { HasRoleDirective } from './dashboards/has-role.directive';

import {
  AgendaService,
  DayService,
  MonthAgendaService,
  MonthService,
  ScheduleModule,
  TimelineMonthService,
  TimelineViewsService,
  WeekService,
  WorkWeekService,
  RecurrenceEditorModule
} from '@syncfusion/ej2-angular-schedule';

import { CalendarModule } from '@syncfusion/ej2-angular-calendars';
import { DropDownListAllModule } from '@syncfusion/ej2-angular-dropdowns';
import { CompteComponent } from './compte/compte.component';
import { DeleteDialogComponent } from './boutique/delete-dialog/delete-dialog.component';
import { AddReservationComponent } from './terrain/add-reservation/add-reservation.component';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { PopoverModule } from 'ngx-bootstrap/popover';

import { DropDownListModule, ComboBoxModule, AutoCompleteModule, MultiSelectModule, ListBoxModule, DropDownTreeModule } from '@syncfusion/ej2-angular-dropdowns';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { environment } from 'src/environments/environment';


import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { MessagingService } from 'src/app/shared/services/messaging.service';
import {MatTableModule} from '@angular/material/table';
import { AcademyManagementComponent } from './academy-management/academy-management.component';
import { AddNewAcademyComponent } from './academy-management/add-new-academy/add-new-academy.component';
import { EquipmentManagementComponent } from './equipment-management/equipment-management.component';
import { AddEquipmentComponent } from './equipment-management/add-equipment/add-equipment.component';
import { MatSelectModule } from '@angular/material/select';
import { GroupsManagementComponent } from './groups-management/groups-management.component';
import { AddGroupsManagementComponent } from './groups-management/add-groups-management/add-groups-management.component';
import { EditGroupsManagementComponent } from './groups-management/edit-groups-management/edit-groups-management.component';
import { DetailsComponent } from './details/details.component';
import { DashboardsContainersModule } from 'src/app/containers/dashboards/dashboards.containers.module';
import { UsersComponent } from './users/users.component';
import { EjsCalendarComponent } from './ejs-calendar/ejs-calendar.component';
import { EventsComponent } from './boutique/events/events.component';
import { AddCoachComponent } from './users/add-coach/add-coach.component';
import { PlayersComponent } from './players/players.component';
import { EditEquipentComponent } from './equipment-management/edit-equipent/edit-equipent.component';
import { AddNewCoachComponent } from './academy-management/add-new-coach/add-new-coach.component';
import { NewCoachModalComponent } from './academy-management/add-new-coach/new-coach-modal/new-coach-modal.component';
import { AffectPlayersComponent } from './groups-management/affect-players/affect-players.component';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { AddPlayerToGroupComponent } from './players/add-player-to-group/add-player-to-group.component';
import { UsersAcademyComponent } from './academy-management/users-academy/users-academy.component';
import { AccordionModule } from '@syncfusion/ej2-angular-navigations';
import { DeleteAcademyComponent } from './academy-management/delete-academy/delete-academy.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { DeletePlayerComponent } from './players/delete-player/delete-player.component';
import { StopDialogComponent } from './ejs-calendar/stop-dialog/stop-dialog.component';
import { EditEventDialogComponent } from './ejs-calendar/edit-event-dialog/edit-event-dialog.component';
import { ProfilPlayerComponent } from './academy-management/users-academy/profil-player/profil-player.component';
import { DeleteCoachComponent } from './academy-management/add-new-coach/delete-coach/delete-coach.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { DeleteEquipmentComponent } from './equipment-management/delete-equipment/delete-equipment.component';
import { ChatComponent } from './academy-management/users-academy/chat/chat.component';
import { ListViewModule } from '@syncfusion/ej2-angular-lists';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AddCoachEventComponent } from './terrain/add-coach-event/add-coach-event.component';
import { ComponentsCardsModule } from 'src/app/components/cards/components.cards.module';
import { CoachProfileComponent } from './players/coach-profile/coach-profile.component';
import { ProfileComponent } from './players/profile/profile.component';
import { PayerDialogComponent } from './academy-management/users-academy/profil-player/payer-dialog/payer-dialog.component';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import {AngularFireStorageModule} from "@angular/fire/storage";
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatToolbarModule} from '@angular/material/toolbar'; 

registerLocaleData(localeFr);

@NgModule({
  declarations: [
    HasRoleDirective,
    AppComponent,
    PharesComponent,
    BoutiqueComponent,
    CreateTerrainComponent,
    ShowTerrainComponent,
    ImageDialogComponent,
    CompteComponent,
    DeleteDialogComponent,
    AddReservationComponent,
    AddEquipmentComponent,
    AcademyManagementComponent,
    AddNewAcademyComponent,
    EquipmentManagementComponent,
    GroupsManagementComponent,
    AddGroupsManagementComponent,
    EditGroupsManagementComponent,
    DetailsComponent,
    // PlayerProfileComponent,
    UsersComponent,
    EjsCalendarComponent,
    EventsComponent,
    AddCoachComponent,
    PlayersComponent,
    EditEquipentComponent,
    AddNewCoachComponent,
    NewCoachModalComponent,
    AffectPlayersComponent,
    AddPlayerToGroupComponent,
    UsersAcademyComponent,
    DeleteAcademyComponent,
    DeletePlayerComponent,
    StopDialogComponent,
    EditEventDialogComponent,
    ProfilPlayerComponent,
    DeleteCoachComponent,
    DeleteEquipmentComponent,
    ChatComponent,
    AddCoachEventComponent,
    CoachProfileComponent,
    ProfileComponent,
    PayerDialogComponent
  ],
  imports: [
    NgxUiLoaderModule,
    ListViewModule, ButtonModule,
    NgSelectModule,
    MatAutocompleteModule,
    DashboardsContainersModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatListModule,
    MatTableModule,
    CommonModule,
    AppRoutingModule,
    SharedModule,
    LayoutContainersModule,
    ComponentsStateButtonModule,
    ComponentsDatePickerModule,
    SortablejsModule,
    ComponentsCardsModule,
    FormsModule,
    
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatDialogModule,
    MatMenuModule,
    MatCardModule,
    CalendarModule,
    MatToolbarModule,
    ScheduleModule,
    AccordionModule,
    DropDownListModule,
    ComboBoxModule,
    AutoCompleteModule,
    MultiSelectModule,
    ListBoxModule,
    DropDownTreeModule,
    RecurrenceEditorModule,
    ModalModule.forRoot(),
    TimepickerModule.forRoot(),
    TabsModule.forRoot(),
    PopoverModule.forRoot(),
    MatButtonModule,
    MatSelectModule,
    MatSidenavModule,
    BsDropdownModule.forRoot(),
    ProgressbarModule.forRoot(),
    BootstrapModule,
    MatSnackBarModule,
    DropDownListAllModule,
    SimpleNotificationsModule.forRoot(),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireMessagingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule
  ],
  entryComponents: [
    CreateTerrainComponent,
    ImageDialogComponent,
    DeleteDialogComponent,
    AddReservationComponent
  ],
  providers: [
    { provide: LOCALE_ID, useValue: "fr-FR" },
    DayService,
    WeekService,
    WorkWeekService,
    MonthService,
    AgendaService,
    MonthAgendaService,
    TimelineViewsService,  //--> to be removed
    TimelineMonthService, //--> to be removed
    MessagingService,AsyncPipe
  ]
})
export class AppModule { 
  constructor(private ms: MessagingService){
    ms.load();
  }
}
