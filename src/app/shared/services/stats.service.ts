import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  private readonly baseUrl = `${environment.apiUrl}/stat`;

  constructor(private http : HttpClient) { }

  statsAcademy(id){
    return this.http.get(`${this.baseUrl}/owner/${id}`);
  }

  statCoach(){
    return this.http.get(`${this.baseUrl}/coach`);
  }

  statsPlayer(){
    return this.http.get(`${this.baseUrl}/player`);
  }
}
