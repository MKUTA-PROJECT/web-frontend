import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClubsService } from 'src/app/shared/services/clubs/clubs.service';
import { MemberService } from 'src/app/shared/services/member/member.service';
import { memberArray } from 'src/app/_model/member';


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
   memberProfile: any;
  

  ngOnInit(): void {
  this.memberId = this.route.snapshot.params['id'];
  this.getMember()
  }

  // This is for mmber details child
  ELEMENT_DATA: memberArray;
  getMember(){
    this.membersService.findMember(this.memberId).subscribe(data => 
      { 
        this.ELEMENT_DATA = data,
          // Profie data
          this.membersService.getMemberProfile(this.ELEMENT_DATA.id).subscribe(profile =>{
            this.memberProfile = profile;
            this.ELEMENT_DATA.club = this.memberProfile.club;
            this.ELEMENT_DATA.role = this.memberProfile.role;

            // Sex
            if (this.ELEMENT_DATA.sex ===1){
              this.ELEMENT_DATA.sex = "Male"
            }
            else {
              this.ELEMENT_DATA.sex = "Female"
            }
            console.log(this.ELEMENT_DATA)

            // Status
            if (this.memberProfile.status ==1){
              this.ELEMENT_DATA.status ="Active"
            }
            else if (this.memberProfile.status ==2){
              this.ELEMENT_DATA.status="Domant"
            }
            else if (this.memberProfile.status ==3){
              this.ELEMENT_DATA.status="Dead"
            }
          })

          this.ELEMENT_DATA.date_joined = this.ELEMENT_DATA.date_joined.split("T")[0];

        this.memberData = this.ELEMENT_DATA
    });
  }

  editMember(id){  
    this.router.navigate(["/members/form",id]); 
  }

}
