// import { Component, OnInit, Input } from '@angular/core';
// import { ChartService } from '../../../components/charts/chart.service';
// import {
//   conversionChartData
// } from '../../../data/charts';
// @Component({
//   selector: 'app-conversion-rates-chart-card',
//   templateUrl: './conversion-rates-chart-card.component.html'
// })
// export class ConversionRatesChartCardComponent implements OnInit {
//   @Input() class = '';
//   @Input() control = true;

//   chartDataConfig: ChartService;

//   conversionChartData = conversionChartData;

//   constructor(private chartService: ChartService) {
//     this.chartDataConfig = this.chartService;
//   }

//   ngOnInit() {
//   }

// }

import { Component, OnInit, Input } from '@angular/core';
import { Colors } from 'src/app/constants/colors.service';
import { Reservation } from 'src/app/shared/models/reservation.model';
import { ReservationService } from 'src/app/shared/services/reservation.service';
import { StatsService } from 'src/app/shared/services/stats.service';
import { ChartService } from '../../../components/charts/chart.service';

export class FilterType {
  key: string;
  val: string;
}

@Component({
  selector: 'app-conversion-rates-chart-card',
  templateUrl: './conversion-rates-chart-card.component.html'
})
export class ConversionRatesChartCardComponent implements OnInit {
  @Input() class = '';
  @Input() control = true;
  type: string = "thisWeek"; 

  filterTypes: Array<FilterType> = [
    { key: "thisWeek", val: "Cette semaine" },
    { key: "lastWeek", val: "La semaine dernière" },
    //{ key : "thisMonth", val : "Ce mois" },
  ]

  typeSelected: string;

  chartDataConfig: ChartService;

  conversionChartData;// = conversionChartData;
  maxValue: number = 10;
  constructor(
    private statPlayerService: StatsService,
    public chartService: ChartService,
    private reservationService: ReservationService
  ) { }

  reservations: Array<number> = new Array<number>();
  days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  countPerDay: Array<any> = new Array<any>();
  loading: boolean = true;
  ngOnInit() {
    this.typeSelected = "Cette semaine";
    // this.thisWeek();
    this.statPlayerService.statsPlayer().subscribe((r: any) => {
      // this.reviewsGroup = r?.groupeReviews;
      this.showStats(r?.groupeReviews);
    });
    
  }


  changeType(key) {

    const typeSelection = this.filterTypes.find((el: FilterType) => el.key == key)
    this.typeSelected = typeSelection.val;

    if (key == "thisWeek") {
      this.loading = true;
      this.thisWeek();
    }
    else if (key == "lastWeek") {
      this.loading = true;
      // this.lastWeek();
    }
  }

  thisWeek() {
    this.reservations = new Array<number>();
    this.statPlayerService.statsPlayer().subscribe(
      (res : any) => {
        this.reservations = res?.groupeReviews as number[];
        console.log(this.reservations);
        
      },
      (err) => { },
      () => {

        this.countPerDay = new Array<any>();
        this.countPerDay = this.days.map((el) => {
          return el;
          //  {
          //   day: el,
          //   count: 0
          // }
        })
        // if(this.reservations.length !== 0){
        //   this.reservations.forEach((el: number) => {
        //     // var d = new Date(el);
        //     // var dayName = this.days[d.getDay()];
  
        //     // this.countPerDay = this.countPerDay.filter((el) => {
        //     //   if (el["day"] == dayName) {
        //     //     el["count"]++;
        //     //   }
        //       return el;
        //     })
  
        //   // })
        // }             
        this.showStats(this.countPerDay);
      }
    )
  }

  lastWeek() {

    // this.reservations = new Array<Reservation>();
    // this.reservationService.getStatsLastWeek().subscribe(
    //   (res) => {
    //     this.reservations = res as Reservation[];
    //   },
    //   (err) => { },
    //   () => {

    //     this.countPerDay = new Array<any>();
    //     this.countPerDay = this.days.map((el) => {
    //       return {
    //         day: el,
    //         count: 0
    //       }
    //     })
    //     if(this.reservations.length !== 0){
    //       this.reservations.forEach((el: Reservation) => {
    //         var d = new Date(el.StartTime);
    //         var dayName = this.days[d.getDay()];
  
    //         this.countPerDay = this.countPerDay.filter((el) => {
    //           if (el["day"] == dayName) {
    //             el["count"]++;
    //           }
    //           return el;
    //         })
    //       })
    //     }

    //     this.showStats(this.countPerDay);
    //   }
    // )

  }



  showStats(data) {


    const arr = data.map((el) => { return el["count"] })
    let max = arr[0];
    arr.forEach((el) => {
      if (el > max) {
        max = el;
      }
    })

    if(max == 0){
      this.maxValue = 10;
    }else{
      // this.maxValue = this.calculateMaxValue(max);
    }

    console.log(this.maxValue);
    
    const conversionChartData = {
      labels: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
      datasets: [
        {
          label: '',
          data: arr,
          borderColor: Colors.getColors().themeColor3,
          pointBackgroundColor: Colors.getColors().foregroundColor,
          pointBorderColor: Colors.getColors().themeColor2,
          pointHoverBackgroundColor: Colors.getColors().themeColor2,
          pointHoverBorderColor: Colors.getColors().foregroundColor,
          pointRadius: 4,
          pointBorderWidth: 2,
          pointHoverRadius: 5,
          fill: true,
          borderWidth: 2,
          backgroundColor: "rgb(0 248 92 / .2)"
        }
      ]
    };
    this.conversionChartData = conversionChartData;
    this.chartDataConfig = this.chartService;
    // this.chartDataConfig.setMaxAreaChartOptions(0, this.maxValue);
    this.loading = false;
  }


  calculateMaxValue(n) {
    return n + (((9 - (n % 10)) + 1) % 10);
  }

}

