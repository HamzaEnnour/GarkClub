import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { EventC } from '../models/event.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  private readonly baseUrl = `${environment.apiUrl}/event`;

  private sendEvent = new BehaviorSubject("");
  public subscriber = this.sendEvent.asObservable();

  emitData(data) {
    this.sendEvent.next(data);
  }

  constructor(private http : HttpClient) { }

  createEvent(event: EventC,id){
    return this.http.post(`${this.baseUrl}/${id}`,  event);
  }

  getEventByCoach(id){
    return this.http.get(`${this.baseUrl}/coach/${id}`);
  }

  getEventByPlayer(id){
    return this.http.get(`${this.baseUrl}/player/${id}`);
  }


  getEventByGroup(id){
    return this.http.get(`${this.baseUrl}/mine/${id}`);
  }

  getEventByAcademy(id){
    return this.http.get(`${this.baseUrl}/academy/${id}`);
  }
  

  editEvent(id: string,newEvent: EventC){
    return this.http.put(`${this.baseUrl}/${id}`,newEvent);
  }

  deleteEvent(id){
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
