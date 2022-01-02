import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AbonnementService {

  private readonly baseUrl = `${environment.apiUrl}/abonnement`;

  constructor(private http : HttpClient) { }

  createSubscription(subscription){
    return this.http.post(`${this.baseUrl}`,  subscription);
  }

  checkPayment(id){
    return this.http.get(`${this.baseUrl}/${id}`);

  }

}

