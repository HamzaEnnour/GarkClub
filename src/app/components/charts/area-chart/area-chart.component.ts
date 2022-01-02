
import { Component, Input, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { Chart } from 'chart.js';
import data from 'src/app/data/products';

@Component({
  selector: 'app-area-chart',
  templateUrl: './area-chart.component.html'
})

export class AreaChartComponent implements AfterViewInit, OnDestroy {

  @Input() shadow = false;
  @Input() options = {
    backgroundColor : "rgb(127, 243, 108)",
    borderColor : "rgb(127, 243, 108)",
  };
  @Input() data;
  @Input() max;
  @Input() class = 'chart-container';
  @ViewChild('chart', { static: true }) chartRef: ElementRef;

  chart: Chart;

  public constructor() { }

  ngAfterViewInit() {
   // this.data.dat
    if (this.shadow) {
      Chart.defaults.lineWithShadow = Chart.defaults.line;
      Chart.controllers.lineWithShadow = Chart.controllers.line.extend({
        draw(ease) {
          Chart.controllers.line.prototype.draw.call(this, ease);
          const chartCtx = this.chart.ctx;
          chartCtx.save();
          chartCtx.shadowColor = 'rgba(0,0,0,0.15)';
          chartCtx.shadowBlur = 10;
          chartCtx.backgroundColor = "#00f85c"
          chartCtx.shadowOffsetX = 0;
          chartCtx.shadowOffsetY = 10;
          chartCtx.responsive = true;
          chartCtx.stroke();
          Chart.controllers.line.prototype.draw.apply(this, arguments);
          chartCtx.restore();
        }
      });
    }

    const chartRefEl = this.chartRef.nativeElement;
    const ctx = chartRefEl.getContext('2d');
    this.chart = new Chart(ctx, {
      type: this.shadow ? 'lineWithShadow' : 'line',
      data: this.data,
      options: this.options
    });
  }

  ngOnDestroy() {
    if (this.chart) {
      this.chart.destroy();
    }
  }
}
