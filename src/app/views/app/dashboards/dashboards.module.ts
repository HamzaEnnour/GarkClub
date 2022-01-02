import { LOCALE_ID, NgModule } from '@angular/core';
import { AnalyticsComponent } from './analytics/analytics.component';
import { ContentComponent } from './content/content.component';
import { DefaultComponent } from './default/default.component';
import { EcommerceComponent } from './ecommerce/ecommerce.component';
import { DashboardsComponent } from './dashboards.component';
import { DashboardsRoutingModule } from './dashboards.routing';
import { SharedModule } from 'src/app/shared/shared.module';
import { DashboardsContainersModule } from 'src/app/containers/dashboards/dashboards.containers.module';
import { ComponentsCardsModule } from 'src/app/components/cards/components.cards.module';
import { LayoutContainersModule } from 'src/app/containers/layout/layout.containers.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SortablejsModule } from 'ngx-sortablejs';
import { CreateSpentIncomeDialog } from './ecommerce/create-spent-income-dialog/create-spent-income-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsStateButtonModule } from 'src/app/components/state-button/components.state-button.module';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { CustomDataTablePagerComponent } from './ecommerce/pager.component';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { MatIconModule } from '@angular/material/icon';
import { CoachComponent } from './coach/coach.component';
import { PlayerComponent } from './player/player.component';
import { ParentComponent } from './parent/parent.component';
import { AccordionModule, TabModule } from '@syncfusion/ej2-angular-navigations';
import { NgbDate,NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FifacardComponent } from '../../fifacard/fifacard.component';
import { ColorPickerModule } from 'ngx-color-picker';
import { CoachCalendarComponent } from './coach-calendar/coach-calendar.component';
import { ScheduleModule } from '@syncfusion/ej2-angular-schedule';
import { CalendarModule } from '@syncfusion/ej2-angular-calendars';
import { CoachReviewComponent } from './coach-review/coach-review.component';
import { CheckBoxModule } from '@syncfusion/ej2-angular-buttons';
import {MatSliderModule} from '@angular/material/slider';
import { SwitchModule } from '@syncfusion/ej2-angular-buttons';
import { FormCoachComponent } from './coach-review/form-coach/form-coach.component';

import { ChartModule, ChartAllModule } from '@syncfusion/ej2-angular-charts';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { AreaSeriesService, LineSeriesService, ExportService, ColumnSeriesService, StackingColumnSeriesService, StackingAreaSeriesService, RangeColumnSeriesService, ScatterSeriesService, PolarSeriesService, CategoryService, RadarSeriesService, ILoadedEventArgs, SplineSeriesService} from '@syncfusion/ej2-angular-charts';
import { CalendarAllModule } from '@syncfusion/ej2-angular-calendars';
import { AutoCompleteModule, ComboBoxAllModule } from '@syncfusion/ej2-angular-dropdowns';
import { GridAllModule } from '@syncfusion/ej2-angular-grids';
import { DialogAllModule } from '@syncfusion/ej2-angular-popups';
import { NumericTextBoxAllModule } from '@syncfusion/ej2-angular-inputs';
import { PlayerCardComponent } from './player-card/player-card.component';
import { AddSubscriptionDialogComponent } from './ecommerce/add-subscription-dialog/add-subscription-dialog.component';
import { ComponentsChartModule } from 'src/app/components/charts/components.charts.module';
import { PlayerCompteComponent } from './player/player-compte/player-compte.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CoachCompteComponent } from './coach-compte/coach-compte.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ProfileComponent } from './player/profile/profile.component';
import { EvaluationComponent } from './coach-calendar/evaluation/evaluation.component';
import { CoachGroupsComponent } from './coach-groups/coach-groups.component';
import { CoachAcademiesComponent } from './coach-academies/coach-academies.component';
import { PlayersProfileComponent } from './coach-groups/players-profile/players-profile.component';
import { CoachProfilRatingComponent } from './player/coach-profil-rating/coach-profil-rating.component';
import { PlayerCalendarComponent } from './player/player-calendar/player-calendar.component';
import {MatCardModule} from '@angular/material/card';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { DropDownListAllModule } from '@syncfusion/ej2-angular-dropdowns';
import { DropDownListModule, ComboBoxModule, MultiSelectModule, ListBoxModule, DropDownTreeModule } from '@syncfusion/ej2-angular-dropdowns';

registerLocaleData(localeFr);
@NgModule({
  declarations: [
    AnalyticsComponent, 
    ContentComponent, 
    DefaultComponent, 
    EcommerceComponent, 
    DashboardsComponent,
    CreateSpentIncomeDialog,
    CustomDataTablePagerComponent,
    CoachComponent,
    PlayerComponent,
    ParentComponent,
    // CalandarComponent,
    FifacardComponent,
    CoachCalendarComponent,
    CoachReviewComponent,
    FormCoachComponent,
    PlayerCardComponent,
    AddSubscriptionDialogComponent,
    PlayerCompteComponent,
    CoachCompteComponent,
    ProfileComponent,
    EvaluationComponent,
    CoachGroupsComponent,
    CoachAcademiesComponent,
    PlayersProfileComponent,
    CoachProfilRatingComponent,
    PlayerCalendarComponent
  ],
  imports: [
    TabsModule,
    BsDropdownModule,
    DropDownListAllModule,
    DropDownListModule, ComboBoxModule, MultiSelectModule, ListBoxModule, DropDownTreeModule,
    MatCardModule,
    ComponentsChartModule,
    AutoCompleteModule,
    GridAllModule,
    DialogAllModule,
    NumericTextBoxAllModule,
    CalendarAllModule,
    ComboBoxAllModule,
    TabModule,
    ChartModule, ButtonModule, ChartAllModule,
    SwitchModule,
    CheckBoxModule,
    MatSliderModule,
    AccordionModule,
    ScheduleModule,
    NgbModule,
    SharedModule,
    LayoutContainersModule,
    DashboardsContainersModule,
    DashboardsRoutingModule,
    ComponentsCardsModule,
    NgxDatatableModule,
    SortablejsModule,
    FormsModule,
    PopoverModule.forRoot(),
    MatIconModule,
    ReactiveFormsModule,
    ComponentsStateButtonModule,
    SimpleNotificationsModule,
    ColorPickerModule,
    CalendarModule,
    NgSelectModule,
    MatSelectModule,
    MatFormFieldModule,
    MatTooltipModule
  ],
  entryComponents: [
    CreateSpentIncomeDialog
  ],
  providers: [
    { provide: LOCALE_ID, useValue: "fr-FR" },
    AreaSeriesService, LineSeriesService, ExportService, ColumnSeriesService, StackingColumnSeriesService, StackingAreaSeriesService, RangeColumnSeriesService, ScatterSeriesService, PolarSeriesService, CategoryService, RadarSeriesService, SplineSeriesService
  ],
  bootstrap:    []
})
export class DashboardsModule { }
