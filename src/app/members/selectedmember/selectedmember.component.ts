import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClubsService } from 'src/app/shared/services/clubs/clubs.service';
import { MemberService } from 'src/app/shared/services/member/member.service';

export interface memberArray {
  id: any;
  first_name: any;
  middle_name: any;
  last_name: any;
  email: any;
  user: any;
  date_joined: any;
  role: any;
  status: any;
  fee_status: any;
  tel: any;
  timestamp: any;
  club: any;
}

@Component({
  selector: 'app-selectedmember',
  templateUrl: './selectedmember.component.html',
  styleUrls: ['./selectedmember.component.scss']
})
export class SelectedmemberComponent implements OnInit {

  constructor(private route: ActivatedRoute, private membersService: MemberService, private clubsService: ClubsService) { }

   // Member details area
   memberId : number;
   memberData: any;
  

  ngOnInit(): void {
  this.memberId = this.route.snapshot.params['id'];
  this.getMember()
  }

  // This is for mmber details child
  ELEMENT_DATA: memberArray;
  getMember(){
    this.membersService.findMember(this.memberId).subscribe(data => 
      { this.ELEMENT_DATA = Object.assign({}, ...data)

          this.clubsService.findClub(this.ELEMENT_DATA.club).subscribe(club=>{
            let clubname: {name: any}
            clubname = club
            this.ELEMENT_DATA.club = clubname.name
          })

          this.ELEMENT_DATA.date_joined = this.ELEMENT_DATA.date_joined.split("T")[0];

          if(this.ELEMENT_DATA.role == 1){
            this.ELEMENT_DATA.role = 'Chairman'
          }
          else if(this.ELEMENT_DATA.role == 2){
            this.ELEMENT_DATA.role = 'Assistant Chairman'
          }
          else if(this.ELEMENT_DATA.role == 3){
            this.ELEMENT_DATA.role = 'Secrtary'
          }
          else if(this.ELEMENT_DATA.role == 4){
            this.ELEMENT_DATA.role = 'Assistant Secrtary'
          }
          else if(this.ELEMENT_DATA.role == 5){
            this.ELEMENT_DATA.role = 'Treasurer'
          }
          else {
            this.ELEMENT_DATA.role = 'Member'
          }

        this.memberData = this.ELEMENT_DATA
    });
  }

}
