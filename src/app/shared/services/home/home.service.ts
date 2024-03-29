import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

const BASE_URL = environment.base_url

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private model = 'dashboard/';
  constructor(private http: HttpClient) { }

  DashboardSummary(){
    return this.http.get<any>(this.geturl())
  }



  private geturl(){
    return `${BASE_URL}${this.model}`;
  }
}
