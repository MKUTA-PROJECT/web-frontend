import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

const BASE_URL = environment.base_url
@Injectable({
  providedIn: 'root'
})
export class ClubsService {
  private model = 'clubs/';       // all clubs

  constructor(private http: HttpClient){}

  allClubs(){
    return this.http.get<any>(this.geturl(),)
  }

  allCSO(){
    return this.http.get<any>(this.geturl()+'cso/')
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
  

