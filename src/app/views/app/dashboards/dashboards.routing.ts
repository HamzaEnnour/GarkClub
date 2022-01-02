import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardsComponent } from './dashboards.component';
import { DefaultComponent } from './default/default.component';
import { ContentComponent } from './content/content.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { EcommerceComponent } from './ecommerce/ecommerce.component';
import { CoachComponent } from './coach/coach.component';
import { ParentComponent } from './parent/parent.component';
import { PlayerComponent } from './player/player.component';
import { CoachCalendarComponent } from './coach-calendar/coach-calendar.component';
import { CoachReviewComponent } from './coach-review/coach-review.component';
import { PlayerCompteComponent } from './player/player-compte/player-compte.component';
import { CoachCompteComponent } from './coach-compte/coach-compte.component';
import { ProfileComponent } from './player/profile/profile.component';
import { CoachGroupsComponent } from './coach-groups/coach-groups.component';
import { CoachAcademiesComponent } from './coach-academies/coach-academies.component';
import { PlayersProfileComponent } from './coach-groups/players-profile/players-profile.component';
import { CoachProfilRatingComponent } from './player/coach-profil-rating/coach-profil-rating.component';
import { PlayerCalendarComponent } from './player/player-calendar/player-calendar.component';

const routes: Routes = [
    {
        path: '', component: DashboardsComponent,
        children: [
            // { path: '', redirectTo: '/', pathMatch: 'full' },
            { path: 'default', component: DefaultComponent },
            { path: 'content', component: ContentComponent },
            { path: 'calendar/:id', component: CoachCalendarComponent },
            { path: 'owner', component: AnalyticsComponent },
            { path: 'financial/:id', component: EcommerceComponent },
            { path: 'coach/:id', component: CoachComponent },
            { path: 'coach-clubs', component: CoachAcademiesComponent },
            
            { path: 'coach-review/:id', component: CoachReviewComponent },
            { path: 'player', component: PlayerComponent },
            { path: 'player-compte', component: PlayerCompteComponent },
            { path: 'coach-compte', component: CoachCompteComponent },
            { path: 'coach-groups/:id', component: CoachGroupsComponent },
            { path: 'player-profile/:id', component: PlayersProfileComponent },
            { path: 'coach-profil-rating', component: CoachProfilRatingComponent },
            { path: 'player-calendar', component: PlayerCalendarComponent },
            
            { path: 'parent', component: ParentComponent },
            { path: 'profile', component: ProfileComponent },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardsRoutingModule { }