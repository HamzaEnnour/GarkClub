import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { CompteComponent } from './compte/compte.component';
import { AcademyManagementComponent } from './academy-management/academy-management.component';
import { EquipmentManagementComponent } from './equipment-management/equipment-management.component';
import { GroupsManagementComponent } from './groups-management/groups-management.component';
import { DetailsComponent } from './details/details.component';
import { PlayerProfileComponent } from './player-profile/player-profile.component';
import { UsersComponent } from './users/users.component';
import { EjsCalendarComponent } from './ejs-calendar/ejs-calendar.component';
import { PlayersComponent } from './players/players.component';
import { AddNewCoachComponent } from './academy-management/add-new-coach/add-new-coach.component';
import { UsersAcademyComponent } from './academy-management/users-academy/users-academy.component';
import { ProfilPlayerComponent } from './academy-management/users-academy/profil-player/profil-player.component';
import { ChatComponent } from './academy-management/users-academy/chat/chat.component';
import { CoachProfileComponent } from './players/coach-profile/coach-profile.component';
import { ProfileComponent } from './players/profile/profile.component';

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
      {
        path: 'dashboards',
        loadChildren: () =>
          import('./dashboards/dashboards.module').then(
            (m) => m.DashboardsModule
          ),
      },
      {
        path: 'menu',
        loadChildren: () =>
          import('./menu/menu.module').then((m) => m.MenuModule),
      },
      { path: 'compte/:id', component: CompteComponent },
      { path: 'clubs', component: AcademyManagementComponent },
      { path: 'groups/:id', component: GroupsManagementComponent},
      { path: 'details/:id', component: DetailsComponent},
      { path: 'equipment/:id', component: EquipmentManagementComponent},
      { path: 'player', component: PlayerProfileComponent},
      { path: 'users', component: UsersComponent},
      { path: 'events/:id', component: EjsCalendarComponent},
      { path: 'players/:academy/:id', component: PlayersComponent},
      { path: 'playeracademy/:id', component: UsersAcademyComponent},
      { path: 'coach/:id', component: AddNewCoachComponent},
      { path: 'player-profile/:id/:player', component: ProfilPlayerComponent},
      { path: 'profile/:id/:player', component: ProfileComponent},
      
      { path: 'coach-profile/:id', component: CoachProfileComponent},
      { path: 'chat-chat', component: ChatComponent},
      
      { path: '', pathMatch: 'full', redirectTo: 'clubs' },
      { path: '**', pathMatch: 'full', redirectTo: 'clubs' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
