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
    return this.http.post<any>(BASE_URL + 'auth/register/', member)
  }

  updateMember(member, data){
    return this.http.put<any>(this.geturl()+member+'/', data)
  }
  createMemberProfile(memberID, data){
    return this.http.post<any>(this.geturl()+memberID+'/profile/', data)
  }

  getMemberProfile(memberProfile){
    return this.http.get<any>(this.geturl()+memberProfile+'/profile/')
  }

  updateMemberProfile(memberProfile, data){
    return this.http.put<any>(this.geturl()+memberProfile+'/profile/', data)
  }

  allMemberRoles(){
    return this.http.get<any>(this.geturl(),)
  }
  private geturl(){
    return `${BASE_URL}${this.model}`;
  }
}
