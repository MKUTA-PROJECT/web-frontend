import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const BASE_URL = 'http://127.0.0.1:8000/'

@Injectable({
  providedIn: 'root'
})
export class SupervisorService {
  private model = 'clubs/supervisor/';       // all suprvisors and post supervisor
  private model2 ='clubs/'
  constructor(private http: HttpClient) { }

  allSupervisors(){
    return this.http.get<any>(this.geturl(),)
  }

  findSupervisor(SupervisorId){

  }
  createSupervisor(Supervisor){
    return this.http.post<any>(this.geturl(), Supervisor)
  }
  updateSupervisor(Supervisor){

  }
  deleteSupervisor(SupervisorId){
    
  }
  findClubSupervisor(clubId){
    return this.http.get<any>(`${BASE_URL}${this.model2}`+clubId+'/supervisor/')
  }

  private geturl(){
    return `${BASE_URL}${this.model}`;
  }
}


