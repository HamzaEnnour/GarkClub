import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { EventReview } from '../models/eventReview.model';

@Injectable({
  providedIn: 'root'
})
export class EventReviewService {

  private readonly baseUrl = `${environment.apiUrl}/eventReview`;

  constructor(private http : HttpClient) { }

  createEvent(eventReview: EventReview,event_id,player_id){
    return this.http.post(`${this.baseUrl}/${event_id}/${player_id}`,  eventReview);
  }

  checkReview(event_id){
    return this.http.get(`${this.baseUrl}/${event_id}`);
  }
}
