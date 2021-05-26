import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const BASE_URL = 'http://127.0.0.1:8000/'
@Injectable({
  providedIn: 'root'
})
export class ClubsService {
  private model = 'clubs/';       // all clubs

  constructor(private http: HttpClient){}

  allClubs(){
    return this.http.get<any>(this.geturl(),)
  }

  findClub(clubId){
    return this.http.get<any>(this.geturl()+clubId+'/')
  }
  findClubMembers(clubId){
    return this.http.get<any>(`${BASE_URL}${this.model}`+clubId+'/member/')
  }
  findClubSupervisor(clubId){
    return this.http.get<any>(`${BASE_URL}${this.model}`+clubId+'/supervisor/')
  }

  createClub(club){
    return this.http.post<any>(this.geturl(), club)
  }
  updateClub(clubID, data){
    return this.http.put<any>(this.geturl()+clubID+'/', data)
  }
  deleteClub(clubId){
    
  }

  private geturl(){
    return `${BASE_URL}${this.model}`;
  }
}
  

