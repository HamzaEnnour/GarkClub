import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { Terrain } from "../models/terrain.model"
import { Academy } from "../models/academy.model"
import { AuthenticationService } from "./authentication.service";
@Injectable({
  providedIn: 'root'
}) 
export class TerrainService {

  private readonly baseUrl = `${environment.apiUrl}/academy`;

  openedTerrain : Terrain = new Terrain();
  constructor(
    private http : HttpClient,
    private router : Router,
    private auth: AuthenticationService
  ) { }

  create(terrain: Terrain){
    return this.http.post(`${this.baseUrl}`,  terrain, { headers: new HttpHeaders({ 'Authorization': this.auth.Token }) } )
  }
  update(terrain: Terrain, _id){
    return this.http.put(`${this.baseUrl}/${_id}`,  terrain, { headers: new HttpHeaders({ 'Authorization': this.auth.Token }) } )
  }
  delete(_id){
    return this.http.delete(`${this.baseUrl}/${_id}`,  { headers: new HttpHeaders({ 'Authorization': this.auth.Token }) } )
  }
  getAll(){
    return this.http.get(`${this.baseUrl}`, { headers: new HttpHeaders({ 'Authorization': this.auth.Token }) });
  }
  findOne(_id : string){
    return this.http.get(`${this.baseUrl}/${_id}`, { headers: new HttpHeaders({ 'Authorization': this.auth.Token }) });
  }

  updateImageSelect(image, _id){
    return this.http.put(`${this.baseUrl}/image/select/${_id}`, { image }, { headers: new HttpHeaders({ 'Authorization': this.auth.Token }) });
  }
  uploadImage(_id, data){
    return this.http.post(`${this.baseUrl}/image/upload/${_id}`, data , { headers: new HttpHeaders({ 'Authorization': this.auth.Token }) });
  }
  changeImageName(_id, data){
    return this.http.put(`${this.baseUrl}/image/change/${_id}`, data , { headers: new HttpHeaders({ 'Authorization': this.auth.Token }) });
  }

  createComplexe(academy: Academy, user){
    return this.http.post(`${this.baseUrl}/academy/${user}`, academy);
  }
  getComplexe(){
    return this.http.get(`${this.baseUrl}/complexe` , { headers: new HttpHeaders({ 'Authorization': this.auth.Token }) });
  }
  updateComplexe(academy: Academy){
    return this.http.put(`${this.baseUrl}/complexe`, academy , { headers: new HttpHeaders({ 'Authorization': this.auth.Token }) });
  }

}
