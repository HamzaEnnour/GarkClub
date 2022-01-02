import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoachReviewService {

  private readonly baseUrl = `${environment.apiUrl}/coachReview`;
  constructor(
    private http : HttpClient,
    private router : Router,
  ) { }

  public getReviewsByCoach(){
    return this.http.get(`${this.baseUrl}/coachReview`);
  }

  public addReview(review){
    return this.http.post(`${this.baseUrl}`, {review});
  }

  public getMeanReviewForCoach(id){
    return this.http.get(`${this.baseUrl}/mean/${id}`);
  }

  public checkIfReviewed(id){
    return this.http.get(`${this.baseUrl}/check/${id}`);
  }
  
}
