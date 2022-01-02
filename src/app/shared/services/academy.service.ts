import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AcademyService {

  private readonly baseUrl = `${environment.apiUrl}/academy`;
  public currentAcademyId = new BehaviorSubject<string>("");

  constructor(private http : HttpClient) { }

  createAcademy(academy){
    return this.http.post(`${this.baseUrl}`,  academy);
  }

  coachesByAcademy(id){
    return this.http.get(`${this.baseUrl}/coaches/${id}`);
  }

  retirerCoachFromAcademy(user_id,academy_id){
    return this.http.post(`${this.baseUrl}/retirerCoachFromAcademy/${user_id}/${academy_id}`,null);
  }

  affectCoachToAcademy(user_id,academy_id){
    return this.http.post(`${this.baseUrl}/affectCoachToAcademy/${user_id}/${academy_id}`,  null);

  }
  getAllAcademies(){
    return this.http.get(`${this.baseUrl}/mine`);
  }

  getAcademyById(id){
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  getAcademiesByCoachId(id){
    return this.http.get(`${this.baseUrl}/getAcademiesByCoachId/${id}`);
  }
  

  getPlayersByAcademy(id){
    return this.http.get(`${this.baseUrl}/players/${id}`);
  }

  editAcademy(id,newAcademy){
    return this.http.put(`${this.baseUrl}/${id}`,newAcademy);
  }

  updateImageAcademy(id,newAcademy){
    return this.http.put(`${this.baseUrl}/image/${id}`,newAcademy);
  }

  deleteAcademy(id){
    return this.http.delete(`${this.baseUrl}/${id}`);
  }


  getCurrentAcademyId(): Observable<string> {
    return this.currentAcademyId.asObservable();
}
}
