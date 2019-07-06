import { Injectable, APP_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';

import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  constructor(private _http: HttpClient) {}
  APIkey = '6a6ee1266a5b9c90f2058a50ce2a3596';

  dailyForecast() {
    return this._http
      .get(
        `http://api.openweathermap.org/data/2.5/history/city?q=Warren,OH&appid=${
          this.APIkey
        }`
      )
      .pipe(map(result => result));
  }
}
