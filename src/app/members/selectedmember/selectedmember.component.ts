import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { anyChanged } from '@progress/kendo-angular-common';
import { ClubsService } from 'src/app/shared/services/clubs/clubs.service';
import { MemberService } from 'src/app/shared/services/member/member.service';
import { memberArray } from 'src/app/_model/member';
import { Payment } from 'src/app/_model/payment';


@Component({
  selector: 'app-selectedmember',
  templateUrl: './selectedmember.component.html',
  styleUrls: ['./selectedmember.component.scss']
})
export class SelectedmemberComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute, 
    private membersService: MemberService, 
    private clubsService: ClubsService) { }

   // Member details area
   memberId : number;
   memberData: any;

  //  contribution details
  contribution: Payment;
  

  ngOnInit(): void {
  this.memberId = this.route.snapshot.params['id'];
  this.getMember()
  }

  // This is for mmber details child
  ELEMENT_DATA: memberArray;
  contribTemp:any;
  getMember(){
    this.membersService.findMember(this.memberId).subscribe(data => 
      { 
        this.ELEMENT_DATA = data;
  
            // Sex
            if (this.ELEMENT_DATA.sex ===1){
              this.ELEMENT_DATA.sex = "Male"
            }
            else {
              this.ELEMENT_DATA.sex = "Female"
            }
            // Status
            if (this.ELEMENT_DATA.status ==1){
              this.ELEMENT_DATA.status ="Active"
            }
            else if (this.ELEMENT_DATA.status ==2){
              this.ELEMENT_DATA.status="Domant"
            }
            else if (this.ELEMENT_DATA.status ==3){
              this.ELEMENT_DATA.status="Dead"
            }

          this.ELEMENT_DATA.date_joined = this.ELEMENT_DATA.date_joined.split("T")[0];

        this.memberData = this.ELEMENT_DATA
    });

    
     // Member contribution data Fetch
     this.membersService.getAllMemberContributions(this.memberId).subscribe(data=>
      {
          this.contribution = data
          // this.contribution.date_paid = this.contribution?.date_paid.split("T")[0];
      
          
      })
  }

  editMember(id){  
    this.router.navigate(["/members/form",id]); 
  }

  editContribution(id){  
    this.router.navigate(["/memberscontib/form",id]); 
  }

}
