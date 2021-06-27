import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

const BASE_URL = environment.base_url

@Injectable({
  providedIn: 'root'
})
export class ClientsService {
  private model = 'clients/';       // all Clients

  constructor(private http: HttpClient){}

  allClients(){
    return this.http.get<any>(this.geturl(),)
  }

  findClient(ClientId){
    return this.http.get<any>(this.geturl()+ClientId+'/')
  }

  createClient(Client){
   
  }

  deleteClient(ClientId){
    
  }

  private geturl(){
    return `${BASE_URL}${this.model}`;
  }

}
