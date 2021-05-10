import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { MemberService } from 'src/app/shared/services/member/member.service';

@Component({
  selector: 'app-memberform',
  templateUrl: './memberform.component.html',
  styleUrls: ['./memberform.component.scss']
})
export class MemberformComponent implements OnInit {

  constructor(private fb: FormBuilder, private router: Router, private membersService: MemberService) { }

  ngOnInit(): void {
  }
  // only fill the fields with no default value
  registrationForm = this.fb.group({
    first_name:  ['',[Validators.required]],
    middle_name: ['',[Validators.required]],
    last_name: ['',[Validators.required]],
    email: ['',[Validators.required,Validators.email,]],
    role: ['',[Validators.required]],
    status: ['',[Validators.required]],
    tel: ['',[Validators.required]],
    club: [ '',[Validators.required]],
  }) 

  getErrorMessage() {
    if (this.registrationForm.get('email').hasError('required')) {
      return 'You must enter a value for email';
    }
    return this.registrationForm.get('email').hasError('email') ? 'Not a valid email' : '';
  }

  memberData
  memberProfileData
  memberID
  // create a Member start by submiting the member data followed by the member detail data async | wait
  async onSubmit(){
        //Data to create a member
        this.memberData= {
          "first_name":this.registrationForm.value.first_name,
          "middle_name":this.registrationForm.value.middle_name,
          "last_name":this.registrationForm.value.last_name,
          "email":this.registrationForm.value.email,   
        }
  
    this.membersService.createMember(this.memberData).subscribe(result => {
      this.memberID = result.id,

        //Data to create a member Profile inside the subscribe funx of create member
        this.memberProfileData= {
          "user": this.memberID,
          "tel":this.registrationForm.value.tel,
          "status":this.registrationForm.value.status,
          "fee_status":this.registrationForm.value.fee_status,
          "club":this.registrationForm.value.club,   
        }
      this.membersService.createMemberProfile(this.memberProfileData).
            subscribe(result => console.log('succeesful created Profile', result)),
            this.router.navigateByUrl('/members');
      }
    );
    
  }
  

  
}
