import { Component } from '@angular/core';
import { WeatherService } from '../app/weather.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  chart: [];
  constructor(private _weather: WeatherService) {}

  ngAfterViewInit() {
    this._weather.dailyForecast().subscribe(res => {
      let temp_max = res['weather'].map(res => res.main.temp_max);
      let temp_min = res['weather'].map(res => res.main.temp_min);
      let allDates = res['weather'].map(res => res.main.dt);

      let weatherDate = [];
      allDates.forEach(res => {
        let jsdate = new Date();
        weatherDate.push(
          jsdate.toLocaleTimeString('en', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          }),

          (this.chart = new Chart('canvas', {
            type: 'line',
            data: {
              labels: weatherDate,
              datasets: [
                {
                  data: temp_max,
                  borderColor: '#3cba9f',
                  fill: false
                },
                {
                  data: temp_min,
                  borderColor: '#ffcc00',
                  fill: false
                }
              ]
            },
            options: {
              legend: {
                display: false
              },
              scales: {
                xAxes: [
                  {
                    display: true
                  }
                ],
                yAxes: [
                  {
                    display: true
                  }
                ]
              }
            }
          }))
        );
      });
      console.log(temp_max);
    });
  }
}
