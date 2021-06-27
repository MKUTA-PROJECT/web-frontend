import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

const BASE_URL = environment.base_url

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  private model = 'members/'
  constructor(private http: HttpClient) { }

  allMembers(){
    return this.http.get<any>(this.geturl(),)
  }

  findMember(memberId){
    return this.http.get<any>(this.geturl()+memberId+'/')
  }

  createMember(member){
    return this.http.post<any>(this.geturl(), member)
  }

  updateMember(member, data){
    return this.http.put<any>(this.geturl()+member+'/', data)
  }
  createMemberProfile(memberProfile){
    return this.http.post<any>(this.geturl()+'profile/', memberProfile)
  }

  updateMemberProfile(memberProfile, data){
    return this.http.put<any>(this.geturl()+'profile/'+memberProfile+'/', data)
  }

  private geturl(){
    return `${BASE_URL}${this.model}`;
  }
}
