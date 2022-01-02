import { Injectable } from '@angular/core';
import { EquipmentModel } from '../models/equipment.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EquipmentsService {

  private readonly baseUrl = `${environment.apiUrl}/materiel`;

  constructor(private http : HttpClient) { }

  createquipment(event: EquipmentModel,id){
    return this.http.post(`${this.baseUrl}/${id}`,  event);
  }

  getEquipmentByAcademyId(id){
    return this.http.get(`${this.baseUrl}/academy/${id}`);
  }

  editquipment(id: string,newEvent: EquipmentModel){
    return this.http.put(`${this.baseUrl}/${id}`,newEvent);
  }

  deleteEquipment(id){
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
