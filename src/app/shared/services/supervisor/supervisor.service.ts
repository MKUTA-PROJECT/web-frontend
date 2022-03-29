import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

const BASE_URL = environment.base_url

@Injectable({
  providedIn: 'root'
})
export class SupervisorService {
  private model = 'supervisor/';       // all suprvisors and post supervisor

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
    // return this.http.get<any>(`${BASE_URL}${this.model2}`+clubId+'/supervisor/')
  }

  private geturl(){
    return `${BASE_URL}${this.model}`;
  }
}


