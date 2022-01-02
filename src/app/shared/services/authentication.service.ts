import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import jwt_decode from 'jwt-decode';
import { IPayload, ICredentails, IRegisterCredentails, User } from '../models/user.model';
import { filter, map } from 'rxjs/operators';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private readonly baseUrl = `${environment.apiUrl}`;
  // private authInfo$ = new BehaviorSubject<any>("");
  private authInfo$ = new Subject<any>();


  constructor(
    private http : HttpClient,
    private router : Router,
  ) { }

  getAuthInfo(): Observable<any>{
    return this.authInfo$.asObservable();
  }

  public getConnectedUser(){
    return this.http.get(`${this.baseUrl}/auth/user`);
    // return this.http.get(`${this.baseUrl}/auth/user`).pipe(map((res: any) => {
    //   this.authInfo$.next(res.user);
    //   console.log(res);
      
    // }));
  }

  public getConnectedPlayer(){
    return this.http.get(`${this.baseUrl}/auth/user`);
  }

  public getAllAcademies(){    
    return this.http.get(`${this.baseUrl}/academy/mine`).subscribe(
      data => console.log(data),
      err => console.log(err)
    );;
  }


  updateUserImage(id,path){
    return this.http.put(`${this.baseUrl}/auth/image/${id}`,path);
  }

  getAllPlayers(){
    return this.http.get(`${this.baseUrl}/auth/userByRole/player`);
  }

  public getAllCoaches(){
    return this.http.get(`${this.baseUrl}/auth/userByRole/coach`);
  }

  public updatePlayerInfo(user){
    return this.http.post(`${this.baseUrl}/auth/updatePlayerInfo`,user);
  }

  public updatePlayerByOwnerInfo(id,user){
    return this.http.put(`${this.baseUrl}/auth/player/${id}`,user);
  }

  public updateCoachByOwnerInfo(id,user){
    return this.http.put(`${this.baseUrl}/auth/coach/${id}`,user);
  }


  public updateOwnerInfo(user,id){
    return this.http.put(`${this.baseUrl}/auth/owner/${id}`,user);
  }

  public logIn(credentials : ICredentails){
    // auth/signin
    
    return this.http.post(`${this.baseUrl}/auth/login`, credentials);
  }

  public registerCoach(academy_id,coach){
    // auth/signin
    return this.http.post(`${this.baseUrl}/auth/register/coach/${academy_id}`, coach);
  }

  public registerPlayer(group_id,player){
    // auth/signin
    return this.http.post(`${this.baseUrl}/auth/register/player/${group_id}`, player);
  }

  public register(credentials : IRegisterCredentails){
    // auth/signin
    return this.http.post(`${this.baseUrl}/auth/register`, credentials);
  }

  public confirmRegister(token){
    return this.http.get(`${this.baseUrl}/auth/register/confirmation/${token}`);
  }

  public requestPasswordReset(email){
    return this.http.post(`${this.baseUrl}/auth/login/forgot`, {email});
  }
  public verifyPasswordReset(creds){
    return this.http.post(`${this.baseUrl}/auth/login/reset/${creds}`, {creds});
  }
  public resetPassword(token, password){
    return this.http.post(`${this.baseUrl}/auth/login/reset/${token}`, {token, password})
  }

  getProfile(){
    return this.http.get(`${this.baseUrl}/profile`, { headers :  new HttpHeaders({ 'Authorization' : this.Token  }) });
  }

  updateProfileImage(formData){
    return this.http.post(`${this.baseUrl}/profile-image`, formData, { headers :  new HttpHeaders({ 'Authorization' : this.Token  }) });
  }

  public updateProfile(user : User){
    return this.http.put(`${this.baseUrl}/profile`, user, { headers :  new HttpHeaders({ 'Authorization' : this.Token  }) });
  }
  public updatePassword( newPassword ){
    // return this.http.post(`${this.baseUrl}/update-password`, {old, newPassword}, { headers :  new HttpHeaders({ 'Authorization' : this.Token  }) });
    return this.http.post(`${this.baseUrl}/auth/editPassword`, newPassword)
  }

  public assignNotificationToken(token: string,userId){
    let paylaod = {"token": token}
    return this.http.post(`${this.baseUrl}/auth/token/${userId}`, paylaod, { headers :  new HttpHeaders({ 'Authorization' : this.Token  }) });
  }

  public getNotificationToken(userId) {
    return this.http.get(`${this.baseUrl}/auth/token/${userId}`, { headers :  new HttpHeaders({ 'Authorization' : this.Token  }) });
  }

  public rememberMe(email: string, password: string){

  }
 
  public signOut(){
    let element =<HTMLElement>document.getElementById('mode');
    localStorage.removeItem('__SEC-ID');
    element.classList.remove('dark');
    this.router.navigateByUrl('/home');
  }
  
  public saveToken(token :string){
    localStorage.setItem('__SEC-ID',token);
  }

  get Token(){
    return localStorage.getItem('__SEC-ID');
  }
 
  get isAuthenticated() : boolean{
    return this.Payload ? true : false;
  }

  get Payload() : IPayload {
    const token = this.Token;
    if(token){
      return jwt_decode(token);
    }
    return null;
  }

  get Role(){
    return localStorage.getItem('role');
  }
 
  get isAuthenticatedByOwner() : boolean{
    console.log(this.RolePayload);
    
    return (this.RolePayload == 'owner') ? true : false;
  }

  get isAuthenticatedCoach() : boolean{
    return (this.RolePayload == 'coach') ? true : false;
  }

  get isAuthenticatedPlayer() : boolean{
    return (this.RolePayload == 'player') ? true : false;
  }

  get RolePayload(){
    const role = this.Role;
    if(role == 'owner'){
      return role;
    }else if (role == 'coach'){
      return role;
    }else if (role == 'player'){
      return role;
    }
    return null;
  }
}
