import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ClubsService } from 'src/app/shared/services/clubs/clubs.service';
import { SupervisorService } from 'src/app/shared/services/supervisor/supervisor.service';

export interface memberArray {
  id: any;
  first_name: any;
  middle_name: any;
  last_name: any;
  // email: any;
  // user: any;
  // date_joined: any;
  // role: any;
  status: any;
  fee_status: any;
  tel: any;
  // timestamp: any;
  // club: any;
}

@Component({
  selector: 'app-selectedclub',
  templateUrl: './selectedclub.component.html',
  styleUrls: ['./selectedclub.component.scss']
})


export class SelectedclubComponent implements OnInit {
  
  constructor(
    private router: Router, 
    private route: ActivatedRoute, 
    private clubsService: ClubsService
    ) { }

  // chub details area
  clubId : number;
  clubData: any;
  supervisorData: any;

  // Club members area
  dataSource: memberArray[];

  ngOnInit(): void {
    this.clubId = this.route.snapshot.params['id'];
    this.getClub()
    this.getClubSupervisor()
    this.allmembers()
  }
// This is for Club details child
  getClub(){
    this.clubsService.findClub(this.clubId).subscribe(data => {this.clubData = data,  console.log(data)});
  }

  getClubSupervisor(){
    this.clubsService.findClubSupervisor(this.clubId).subscribe(data => {this.supervisorData = Object.assign({}, ...data),  console.log(Object.assign({}, ...data))});
  }

  // This is for club members child
  allmembers(){
    this.clubsService.findClubMembers(this.clubId).subscribe(data =>{ this.dataSource = data, console.log(data)});
  }
  
  editClub(id){  
    this.router.navigate(["/clubs/form",id]); 
  }
}
