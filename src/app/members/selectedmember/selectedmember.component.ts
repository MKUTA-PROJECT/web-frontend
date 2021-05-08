import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(private router: Router, private route: ActivatedRoute, private membersService: MemberService) { }

   // Member details area
   memberId : number;
   memberData: any;
  

  ngOnInit(): void {
  this.memberId = this.route.snapshot.params['id'];
  this.getMember()
  }

  // This is for Club details child
  getMember(){
    this.membersService.findMember(this.memberId).subscribe(data => {this.memberData = Object.assign({}, ...data),  console.log(data)});
  }

}
