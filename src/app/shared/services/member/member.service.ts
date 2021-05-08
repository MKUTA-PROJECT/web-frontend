import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const BASE_URL = 'http://127.0.0.1:8000/'

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

  private geturl(){
    return `${BASE_URL}${this.model}`;
  }
}
