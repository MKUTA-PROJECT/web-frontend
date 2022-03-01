import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

const BASE_URL = environment.base_url
@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  private model = 'projects/';      

  constructor(private http: HttpClient){}

  allProjects(){
    return this.http.get<any>(this.geturl(),)
  }

  findProject(projectId){
    return this.http.get<any>(this.geturl()+projectId+'/')
  }

  findProjectMembers(projectId){
    return this.http.get<any>(`${BASE_URL}${this.model}`+projectId+'/member/')
  }

  createProject(Project){
    return this.http.post<any>(this.geturl(), Project)
  }
  updateProject(ProjectID, data){
    return this.http.put<any>(this.geturl()+ProjectID+'/', data)
  }
  deleteProject(ProjectId){
    
  }

  private geturl(){
    return `${BASE_URL}${this.model}`;
  }
}
