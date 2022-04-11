import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

const BASE_URL = environment.base_url

@Injectable({
  providedIn: 'root'
})
export class StaffService {

  private model = 'staffs/'
  constructor(private http: HttpClient) { }

  allStaffs(){
    return this.http.get<any>(this.geturl(),)
  }

  findStaff(staffId){
    return this.http.get<any>(this.geturl()+staffId+'/')
  }

  createStaff(staff){
    return this.http.post<any>(BASE_URL + 'auth/register/', staff)
  }
  updateStaff(staffID, data){
    return this.http.put<any>(this.geturl()+staffID+'/', data)
  }
  createStaffProfile(staffID,staffProfile){
    return this.http.post<any>(this.geturl()+staffID+'/profile/',staffProfile)
  }
  updateStaffProfile(staffProfileID, data){
    return this.http.put<any>(this.geturl()+staffProfileID+'/profile/', data)
  }
  getStaffProfile(staffProfileID){
    return this.http.get<any>(this.geturl()+staffProfileID+'/profile/')
  }

  private geturl(){
    return `${BASE_URL}${this.model}`;
  }
}
