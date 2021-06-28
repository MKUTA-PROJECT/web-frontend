import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

const BASE_URL = environment.base_url

@Injectable({
  providedIn: 'root'
})
export class InfoService {
  private model = 'info/';       // all info

  constructor(private http: HttpClient){}

  allClubs(){
    return this.http.get<any>(this.geturl(),)
  }


  private geturl(){
    return `${BASE_URL}${this.model}`;
  }

}
