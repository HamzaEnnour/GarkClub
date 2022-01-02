import { NgModule, Injectable } from '@angular/core';
import { AdvancedSearchComponent } from './advanced-search/advanced-search.component';
import { BestSellersComponent } from './best-sellers/best-sellers.component';
import { CakesComponent } from './cakes/cakes.component';
import { ConversionRatesChartCardComponent } from './conversion-rates-chart-card/conversion-rates-chart-card.component';
import { GradientCardContainerComponent } from './gradient-card-container/gradient-card-container.component';
import { IconCardsCarouselComponent } from './icon-cards-carousel/icon-cards-carousel.component';
import { LogsComponent } from './logs/logs.component';
import { NewCommentsComponent } from './new-comments/new-comments.component';
import { OrderStockRadarChartComponent } from './order-stock-radar-chart/order-stock-radar-chart.component';
import { ProductCategoriesDoughnutComponent } from './product-categories-doughnut/product-categories-doughnut.component';
import { ProductCategoriesPolarAreaComponent } from './product-categories-polar-area/product-categories-polar-area.component';
import { ProfileStatusesComponent } from './profile-statuses/profile-statuses.component';
import { QuickPostComponent } from './quick-post/quick-post.component';
import { RecentOrdersComponent } from './recent-orders/recent-orders.component';
import { SalesChartCardComponent } from './sales-chart-card/sales-chart-card.component';
import { SmallLineChartsComponent } from './small-line-charts/small-line-charts.component';
import { SortableStatisticsRowComponent } from './sortable-statistics-row/sortable-statistics-row.component';
import { TicketsComponent } from './tickets/tickets.component';
import { TopRatedItemsComponent } from './top-rated-items/top-rated-items.component';
import { WebsiteVisitsChartCardComponent } from './website-visits-chart-card/website-visits-chart-card.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ComponentsCarouselModule } from 'src/app/components/carousel/components.carousel.module';
import { ComponentsChartModule } from 'src/app/components/charts/components.charts.module';
import { ComponentsCardsModule } from 'src/app/components/cards/components.cards.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SortablejsModule } from 'ngx-sortablejs';
import { FormsModule  } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { RatingModule } from 'ngx-bootstrap/rating';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import {MatIconModule} from '@angular/material/icon';
import {EquipmentComponent} from './equipment/equipment.component';
import { AcademylistComponent } from './academylist/academylist.component';
import { PlayerProfileComponent } from 'src/app/views/app/player-profile/player-profile.component';
import { BestPlayersComponent } from './best-players/best-players.component';
import { StarRatingComponent } from 'src/app/views/app/dashboards/player/star-rating/star-rating.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
    declarations: [
    StarRatingComponent,
        PlayerProfileComponent,
        AdvancedSearchComponent,
        BestSellersComponent,
        CakesComponent,
        ConversionRatesChartCardComponent,
        GradientCardContainerComponent,
        IconCardsCarouselComponent,
        LogsComponent,
        NewCommentsComponent,
        OrderStockRadarChartComponent,
        ProductCategoriesDoughnutComponent,
        ProductCategoriesPolarAreaComponent,
        ProfileStatusesComponent,
        QuickPostComponent,
        RecentOrdersComponent,
        SalesChartCardComponent,
        SmallLineChartsComponent,
        SortableStatisticsRowComponent,
        TicketsComponent,
        TopRatedItemsComponent,
        WebsiteVisitsChartCardComponent,
        EquipmentComponent,
        AcademylistComponent,
        BestPlayersComponent
    ],
    imports: [
        SharedModule,
        ComponentsCarouselModule,
        ComponentsChartModule,
        ComponentsCardsModule,
        NgxDatatableModule,
        SortablejsModule,
        RatingModule.forRoot(),
        FormsModule,
        MatIconModule,
        NgSelectModule,
        MatSnackBarModule,
        ProgressbarModule.forRoot(),
        ModalModule.forRoot(),
        BsDropdownModule.forRoot()
    ],
    providers: [ ],
    exports: [
    StarRatingComponent,
        AdvancedSearchComponent,
        BestSellersComponent,
        CakesComponent,
        ConversionRatesChartCardComponent,
        GradientCardContainerComponent,
        IconCardsCarouselComponent,
        LogsComponent,
        NewCommentsComponent,
        OrderStockRadarChartComponent,
        ProductCategoriesDoughnutComponent,
        ProductCategoriesPolarAreaComponent,
        ProfileStatusesComponent,
        QuickPostComponent,
        RecentOrdersComponent,
        SalesChartCardComponent,
        SmallLineChartsComponent,
        SortableStatisticsRowComponent,
        TicketsComponent,
        TopRatedItemsComponent,
        WebsiteVisitsChartCardComponent,
        EquipmentComponent,
        AcademylistComponent,
        BestPlayersComponent
    ]
})

export class DashboardsContainersModule { }
