import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const BASE_URL = 'http://127.0.0.1:8000/'
@Injectable({
  providedIn: 'root'
})
export class ClubsService {
  private model = 'clubs/';
  constructor(private http: HttpClient){}

  allClubs(){
    return this.http.get<any>(this.geturl(),)
  }

  findClub(clubId){

  }
  createClub(club){
    return this.http.get<any>(this.geturl(), club)
  }
  updateClub(club){

  }
  deleteClub(clubId){
    
  }

  private geturl(){
    return `${BASE_URL}${this.model}`;
  }
}
  

