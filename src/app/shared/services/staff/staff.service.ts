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
    return this.http.post<any>(this.geturl(), staff)
  }
  updateStaff(staffID, data){
    return this.http.put<any>(this.geturl()+staffID+'/', data)
  }
  createStaffProfile(staffProfile){
    return this.http.post<any>(this.geturl()+'profile/',staffProfile)
  }
  updateStaffProfile(staffProfileID, data){
    return this.http.put<any>(this.geturl()+'profile/'+staffProfileID+'/', data)
  }

  private geturl(){
    return `${BASE_URL}${this.model}`;
  }
}
