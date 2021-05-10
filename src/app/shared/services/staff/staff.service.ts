import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const BASE_URL = 'http://127.0.0.1:8000/'
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
  createStaffProfile(staffProfile){
    return this.http.post<any>(this.geturl()+'profile/', staffProfile)
  }

  private geturl(){
    return `${BASE_URL}${this.model}`;
  }
}
