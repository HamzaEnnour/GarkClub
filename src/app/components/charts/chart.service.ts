import { Injectable } from '@angular/core';
import { Colors } from '../../constants/colors.service';

@Injectable({ providedIn: 'root' })
export class ChartService {

  private _chartTooltip = {
    backgroundColor: Colors.getColors().foregroundColor,
    titleFontColor: Colors.getColors().primaryColor,
    borderColor: Colors.getColors().separatorColor,
    borderWidth: 0.5,
    bodyFontColor: Colors.getColors().primaryColor,
    bodySpacing: 10,
    xPadding: 15,
    yPadding: 15,
    cornerRadius: 0.15
  };

  public get chartTooltip() {
    return this._chartTooltip;
  }

  private _centerTextPlugin = {
    beforeDraw(chart) {
      const width = chart.chartArea.right;
      const height = chart.chartArea.bottom;
      const ctx = chart.chart.ctx;
      ctx.restore();

      let activeLabel = chart.data.labels[0];
      let activeValue = chart.data.datasets[0].data[0];
      let dataset = chart.data.datasets[0];
      let meta = dataset._meta[Object.keys(dataset._meta)[0]];
      let total = meta.total;

      let activePercentage = parseFloat(((activeValue / total) * 100).toFixed(1));
      activePercentage = chart.legend.legendItems[0].hidden
        ? 0
        : activePercentage;

      if (chart.pointAvailable) {
        activeLabel = chart.data.labels[chart.pointIndex];
        activeValue =
          chart.data.datasets[chart.pointDataIndex].data[chart.pointIndex];

        dataset = chart.data.datasets[chart.pointDataIndex];
        meta = dataset._meta[Object.keys(dataset._meta)[0]];
        total = meta.total;
        activePercentage = parseFloat(((activeValue / total) * 100).toFixed(1));
        activePercentage = chart.legend.legendItems[chart.pointIndex].hidden
          ? 0
          : activePercentage;
      }

      ctx.font = '36px Nunito, sans-serif';
      ctx.fillStyle = Colors.getColors().primaryColor;
      ctx.textBaseline = 'middle';

      const text = activePercentage + '%';
      const textX = Math.round((width - ctx.measureText(text).width) / 2);
      const textY = height / 2;
      ctx.fillText(text, textX, textY);

      ctx.font = '14px Nunito, sans-serif';
      ctx.textBaseline = 'middle';

      const text2 = activeLabel;
      const textX2 = Math.round((width - ctx.measureText(text2).width) / 2);
      const textY2 = height / 2 - 30;
      ctx.fillText(text2, textX2, textY2);

      ctx.save();
    },
    beforeEvent(chart, event, options) {
      const firstPoint = chart.getElementAtEvent(event)[0];

      if (firstPoint) {
        chart.pointIndex = firstPoint._index;
        chart.pointDataIndex = firstPoint._datasetIndex;
        chart.pointAvailable = true;
      }
    }
  };

  public get centerTextPlugin() {
    return this._centerTextPlugin;
  }

  private _polarAreaChartOptions = {
    legend: {
      position: 'bottom',
      labels: {
        padding: 30,
        usePointStyle: true,
        fontSize: 12
      }
    },
    responsive: true,
    maintainAspectRatio: false,
    scale: {

      ticks: {
        display: false,
        maxTicksLimit: 6
      }
    },
    plugins: {
      datalabels: {
        display: false
      }
    },
    tooltips: this.chartTooltip
  };

  public get polarAreaChartOptions() {
    return this._polarAreaChartOptions;
  }

  private _lineChartOptions = {
    legend: {
      display: false
    },
    responsive: true,
    maintainAspectRatio: false,
    tooltips: this.chartTooltip,
    plugins: {
      datalabels: {
        display: false
      }
    },
    scales: {
      yAxes: [
        {
          gridLines: {
            display: true,
            lineWidth: 1,
            color: 'rgba(0,0,0,0.1)',
            drawBorder: false
          },
          ticks: {
            beginAtZero: true,
            stepSize: 1,
            min: 0,
            max: 20,
            padding: 20
          }
        }
      ],
      xAxes: [
        {
          gridLines: {
            display: false
          }
        }
      ]
    }
  };

  public get lineChartOptions() {
    return this._lineChartOptions;
  }

  private _areaChartOptions = {
    legend: {
      display: true
    },
    responsive: true,
    maintainAspectRatio: false,
    tooltips: this.chartTooltip,
    scales: {
      yAxes: [
        {
          gridLines: {
            display: true,
            lineWidth: 1,
            color: 'rgba(0,0,0,0.1)',
            drawBorder: false
          },
          ticks: {
            beginAtZero: true,
            stepSize: 10,
            min: 0,
            max: 100,
            padding: 20
          }
        }
      ],
      xAxes: [
        {
          gridLines: {
            display: false
          }
        }
      ]
    }
  };

  public get areaChartOptions() {
    return this._areaChartOptions;
  }

  public setMaxAreaChartOptions(min,max){
    this._areaChartOptions.scales.yAxes[0]["ticks"]["max"] = max;

    this._areaChartOptions.scales.yAxes[0]["ticks"]["stepSize"] = 5;
  }

  private _scatterChartOptions = {
    legend: {
      position: 'bottom',
      labels: {
        padding: 30,
        usePointStyle: true,
        fontSize: 12
      }
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      yAxes: [
        {
          gridLines: {
            display: true,
            lineWidth: 1,
            color: 'rgba(0,0,0,0.1)',
            drawBorder: false
          },
          ticks: {
            beginAtZero: true,
            stepSize: 20,
            min: -80,
            max: 80,
            padding: 20
          }
        }
      ],
      xAxes: [
        {
          gridLines: {
            display: true,
            lineWidth: 1,
            color: 'rgba(0,0,0,0.1)'
          }
        }
      ]
    },
    tooltips: this.chartTooltip
  };

  public get scatterChartOptions() {
    return this._scatterChartOptions;
  }

  private _barChartOptions = {
    legend: {
      position: 'bottom',
      labels: {
        padding: 30,
        usePointStyle: true,
        fontSize: 12
      }
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      yAxes: [
        {
          gridLines: {
            display: true,
            lineWidth: 1,
            color: 'rgba(0,0,0,0.1)',
            drawBorder: false
          },
          ticks: {
            beginAtZero: true,
            stepSize: 100,
            min: 300,
            max: 800,
            padding: 20
          }
        }
      ],
      xAxes: [
        {
          gridLines: {
            display: false
          }
        }
      ]
    },
    tooltips: this.chartTooltip
  };

  public get barChartOptions() {
    return this._barChartOptions;
  }

  private _radarChartOptions = {
    legend: {
      position: 'bottom',
      labels: {
        padding: 30,
        usePointStyle: true,
        fontSize: 12
      }
    },
    responsive: true,
    maintainAspectRatio: false,
    scale: {
      ticks: {
        display: false
      }
    },
    tooltips: this.chartTooltip
  };

  public get radarChartOptions() {
    return this._radarChartOptions;
  }

  private _pieChartOptions = {
    legend: {
      position: 'bottom',
      labels: {
        padding: 30,
        usePointStyle: true,
        fontSize: 12
      }
    },
    responsive: true,
    maintainAspectRatio: false,
    title: {
      display: false
    },
    layout: {
      padding: {
        bottom: 20
      }
    },
    tooltips: this.chartTooltip
  };

  public get pieChartOptions() {
    return this._pieChartOptions;
  }

  private _doughnutChartOptions = {
    legend: {
      position: 'bottom',
      labels: {
        padding: 30,
        usePointStyle: true,
        fontSize: 12
      }
    },
    responsive: true,
    maintainAspectRatio: false,
    title: {
      display: false
    },
    cutoutPercentage: 80,
    layout: {
      padding: {
        bottom: 20
      }
    },
    tooltips: this.chartTooltip
  };

  public get doughnutChartOptions() {
    return this._doughnutChartOptions;
  }

  private _smallLineChartOptions = {
    layout: {
      padding: {
        left: 5,
        right: 5,
        top: 10,
        bottom: 10
      }
    },
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      display: false
    },
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true
          },
          display: false
        }
      ],
      xAxes: [
        {
          display: false
        }
      ]
    }
  };

  public get smallLineChartOptions() {
    return this._smallLineChartOptions;
  }


}
