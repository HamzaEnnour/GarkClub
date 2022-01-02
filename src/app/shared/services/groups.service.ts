import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {

  private readonly baseUrl = `${environment.apiUrl}/groupe`;

  constructor(private http : HttpClient) { }

  public selectedGroup = new BehaviorSubject<any>('');
  createGroup(group,id){
    return this.http.post(`${this.baseUrl}/${id}`,  group);
  }

  addPlayersToGroup(players,group_id){
    return this.http.post(`${this.baseUrl}/addplayersToGroup/${group_id}`,  players);
  }

  getPlayersByGroupId(id){
    return this.http.get(`${this.baseUrl}/players/${id}`);
  }

  getPlayersWithState(id){
    return this.http.get(`${this.baseUrl}/players-state/${id}`);
  }
  

  getAllGroupByAcademyId(id){
    return this.http.get(`${this.baseUrl}/mine/${id}`);
  }

  getGroupsByCoachId(id){
    return this.http.get(`${this.baseUrl}/getGroupesByCoachId/${id}`);
  }

  getCoachByPlayerId(id){
    return this.http.get(`${this.baseUrl}/getCoachByPlayerId/${id}`);
  }

  getAllGroups(){
    return this.http.get(`${this.baseUrl}`);
  }

  editGroup(id,newGroup){
    return this.http.put(`${this.baseUrl}/${id}`,newGroup);
  }

  deleteGroup(id){
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  deletePlayer(user_id,group_id){
    return this.http.delete(`${this.baseUrl}/retirerPlayerFromGroup/${user_id}/${group_id}`);
  }
}
