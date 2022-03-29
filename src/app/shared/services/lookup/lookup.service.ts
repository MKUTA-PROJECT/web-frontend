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

  allMemberRoles(){
    return this.http.get<any>(this.geturl() + 'memberroles/')
  }


  private geturl(){
    return `${BASE_URL}${this.model}`;
  }
}
