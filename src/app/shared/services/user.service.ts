import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly baseUrl = `${environment.apiUrl}/handleRole`;

  constructor(private http : HttpClient) { }

  getAllUsers(){
    return this.http.get(`${this.baseUrl}/users`);
  }

  changeToPlayer(id){
    return this.http.get(`${this.baseUrl}/player/${id}`);
  }

  changeToCoach(id){
    return this.http.get(`${this.baseUrl}/coach/${id}`);
  }

  registerCoach(id,user: User){
    return this.http.post(`${this.baseUrl}/register/coach/${id}`,user);
  }
}
