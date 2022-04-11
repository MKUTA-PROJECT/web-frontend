import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

const BASE_URL = environment.base_url

@Injectable({
  providedIn: 'root'
})
export class LookupService {
  private model = 'lookup/';
  constructor(private http: HttpClient) { }

  // Member
  allMemberRoles(){
    return this.http.get<any>(this.geturl() + 'memberroles/')
  }

  getMemberRole(roleId){
    return this.http.get<any>(this.geturl() + 'memberroles/'+roleId+'/')
  }

  // staff
  allStaffRoles(){
    return this.http.get<any>(this.geturl() + 'staffroles/')
  }

  getStaffRole(roleId){
    return this.http.get<any>(this.geturl() + 'staffroles/'+roleId+'/')
  }

  // Location
  getLocation(locationId){
    return this.http.get<any>(this.geturl() + 'location/'+locationId+'/')
  }


  private geturl(){
    return `${BASE_URL}${this.model}`;
  }
}
