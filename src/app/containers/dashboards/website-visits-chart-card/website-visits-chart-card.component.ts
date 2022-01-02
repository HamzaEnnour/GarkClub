import { Component, OnInit, Input } from '@angular/core';
import { Colors } from 'src/app/constants/colors.service';
import { StatsService } from 'src/app/shared/services/stats.service';
import { ChartService } from '../../../components/charts/chart.service';
import {
  areaChartData
} from '../../../data/charts';

@Component({
  selector: 'app-website-visits-chart-card',
  templateUrl: './website-visits-chart-card.component.html'
})
export class WebsiteVisitsChartCardComponent implements OnInit {
  @Input() class = '';
  @Input() control = true;

  chartDataConfig: ChartService;

  areaChartData;// = areaChartData;
  reviewsGroup: any[] = [];
  reviewsPlayer: any[] =[];
  constructor(
    private statPlayerService: StatsService,
    private chartService: ChartService) {
  }

  ngOnInit() {

    this.statPlayerService.statsPlayer().subscribe((r: any) => {
      this.reviewsGroup = r?.groupeReviews;
      for (let index = 0; index < r?.reviews?.length; index++) {
        this.reviewsPlayer.push(Math.round(Math.round(
          (r?.reviews[index]?.defence + r?.reviews[index]?.drible + r?.reviews[index]?.pace +
          r?.reviews[index]?.passe + r?.reviews[index]?.physique + r?.reviews[index]?.shot) / 6)));
      }
      
      let areaChartData = {
        labels: ['match 1', 'match 2', 'match 3', 'match 4', 'match 5', 'match 6', 'match 7','match 8','match 9'],
        datasets: [
          {
            label: 'individuel',
            data: this.reviewsPlayer,
            borderColor: Colors.getColors().themeColor1,
            pointBackgroundColor: Colors.getColors().foregroundColor,
            pointBorderColor: Colors.getColors().themeColor1,
            pointHoverBackgroundColor: Colors.getColors().themeColor1,
            pointHoverBorderColor: Colors.getColors().foregroundColor,
            pointRadius: 4,
            pointBorderWidth: 2,
            pointHoverRadius: 5,
            fill: true,
            borderWidth: 2,
            backgroundColor: Colors.getColors().themeColor1_10
          },
          {
            label: 'Moyenne',
            data: this.reviewsGroup,
            borderColor: Colors.getColors().themeColor4,
            pointBackgroundColor: Colors.getColors().foregroundColor,
            pointBorderColor: Colors.getColors().themeColor4,
            pointHoverBackgroundColor: Colors.getColors().themeColor4,
            pointHoverBorderColor: Colors.getColors().foregroundColor,
            pointRadius: 4,
            pointBorderWidth: 2,
            pointHoverRadius: 5,
            fill: true,
            borderWidth: 2,
            backgroundColor: Colors.getColors().themeColor4_10
          }
        ]
    };
    this.areaChartData = areaChartData;
    this.chartDataConfig = this.chartService;
    // console.log(this.chartDataConfig);
  });
  

}

}
