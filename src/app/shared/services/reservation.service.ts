import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { Terrain } from "../models/terrain.model"
import { AuthenticationService } from "./authentication.service";
import { Reservation } from '../models/reservation.model';
import * as moment from 'moment'; 
@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private readonly baseUrl = `${environment.apiUrl}/reservations`;
  
  constructor(
    private http : HttpClient,
    private router : Router,
    private auth: AuthenticationService
  ) { }

  create(reservation){
    let reserv = reservation as Reservation;
    reserv.StartTime = moment(reserv.StartTime).utcOffset(1).toDate();
    reserv.EndTime = moment(reserv.EndTime).utcOffset(1).toDate();
    return this.http.post(`${this.baseUrl}`,  reserv, { headers: new HttpHeaders({ 'Authorization': this.auth.Token }) } )
  }

  getAll(){
    return this.http.get(`${this.baseUrl}`, { headers: new HttpHeaders({ 'Authorization': this.auth.Token }) });
  }

  getStatsWeek(){
    return this.http.get(`${this.baseUrl}/generate/stats`, { headers: new HttpHeaders({ 'Authorization': this.auth.Token }) });
  }
  getStatsLastWeek(){
    return this.http.get(`${this.baseUrl}/generate/stats/last-week`, { headers: new HttpHeaders({ 'Authorization': this.auth.Token }) });
  }
  getTopPlayers(){
    return this.http.get(`${this.baseUrl}/generate/top`, { headers: new HttpHeaders({ 'Authorization': this.auth.Token }) });
  }
  getCount(){
    return this.http.get(`${this.baseUrl}/generate/count`, { headers: new HttpHeaders({ 'Authorization': this.auth.Token }) });
  }
  getCountMoeny(){
    return this.http.get(`${this.baseUrl}/generate/countMoney`, { headers: new HttpHeaders({ 'Authorization': this.auth.Token }) });
  }
  updateOne(_id, reservation){
    return this.http.put(`${this.baseUrl}/${_id}`,  reservation, { headers: new HttpHeaders({ 'Authorization': this.auth.Token }) } )
  }
  deleteOne(_id){
    return this.http.delete(`${this.baseUrl}/${_id}`, { headers: new HttpHeaders({ 'Authorization': this.auth.Token }) } )
  }

  getTerrainReservations(_id){
    return this.http.patch(`${this.baseUrl}/${_id}`, { headers: new HttpHeaders({ 'Authorization': this.auth.Token }) } )
  }
}
