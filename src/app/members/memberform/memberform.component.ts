import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClubsService } from 'src/app/shared/services/clubs/clubs.service';
import { MemberService } from 'src/app/shared/services/member/member.service';
import { first } from 'rxjs/operators';
import { MustMatch } from 'src/app/_helpers';
import { Location } from '@angular/common';
import { LookupService } from 'src/app/shared/services/lookup/lookup.service';
import { memberArray } from 'src/app/_model/member';

@Component({
  selector: 'app-memberform',
  templateUrl: './memberform.component.html',
  styleUrls: ['./memberform.component.scss']
})
export class MemberformComponent implements OnInit {
  memberID : string;
  isAddMode: boolean;
  registrationForm : FormGroup;
  

  constructor(
    private fb: FormBuilder, 
    private route: ActivatedRoute,
    private location: Location,
    private LookupService: LookupService,
    private membersService: MemberService, 
    private clubsService: ClubsService) { }

  ELEMENT_DATA: memberArray;
  memberProfile:any;
  clubs = this.clubsService.allClubs()
  roles = this.LookupService.allMemberRoles()
  ngOnInit(): void {
    this.memberID = this.route.snapshot.params['id'];
    this.isAddMode = !this.memberID;

    
    // Check if it is Create Or Update
    if  (!this.isAddMode) {
      this.membersService.findMember(this.memberID).pipe(first())
        .subscribe(x => 
          {this.ELEMENT_DATA = x;
          // Profie data
            // Sex
            if (this.ELEMENT_DATA.sex ==1){
              this.ELEMENT_DATA.sex = "1"
            }
            else if (this.ELEMENT_DATA.sex ==2){
              this.ELEMENT_DATA.sex = "2"
            }
            console.log(this.ELEMENT_DATA)

            // Is post TB
            if (this.ELEMENT_DATA.is_post_tb ==true){
              this.ELEMENT_DATA.is_post_tb = "True"
            }
            else if (this.ELEMENT_DATA.is_post_tb ==false){
              this.ELEMENT_DATA.is_post_tb = "False"
            }
            console.log(this.ELEMENT_DATA)
            
            // Status
            if (this.ELEMENT_DATA.status ==1){
              this.ELEMENT_DATA.status ="1"
            }
            else if (this.ELEMENT_DATA.status ==2){
              this.ELEMENT_DATA.status="2"
            }
            else if (this.ELEMENT_DATA.status ==3){
              this.ELEMENT_DATA.status="3"
            }
              this.LookupService.getMemberRole(this.ELEMENT_DATA.role).subscribe(roles => {
                this.ELEMENT_DATA.role = Object.assign({}, ...roles.map((x) => ({[x.id]: x.name})));
              })

            this.registrationForm.patchValue(this.ELEMENT_DATA)        
          })
    }


    // password not required in edit mode
    const passwordValidators = [Validators.minLength(6)];
    if (this.isAddMode) {
        passwordValidators.push(Validators.required);
    }

      // only fill the fields with no default value
  this.registrationForm = this.fb.group({
    first_name:  ['',[Validators.required]],
    middle_name: ['',[Validators.required]],
    last_name: ['',[Validators.required]],
    email: ['',[Validators.required,Validators.email,]],
    role: ['',[Validators.required]],
    status: ['',[Validators.required]],
    sex: ['',[Validators.required]],
    is_post_tb: ['',[Validators.required]],
    phone: ['',[Validators.required]],
    club: [ '',[Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6),this.isAddMode ? Validators.required : Validators.nullValidator]],
    confirmPassword: ['', this.isAddMode ? Validators.required : Validators.nullValidator],
  },{
    validator: MustMatch('password', 'confirmPassword')
  }
  ) 
    
    
  }


  getErrorMessage() {
    if (this.registrationForm.get('email').hasError('required')) {
      return 'You must enter a value for email';
    }
    return this.registrationForm.get('email').hasError('email') ? 'Not a valid email' : '';
  }
  memberData
  memberProfileData
  // memberID


  // create a Member start by submiting the member data followed by the member detail data async | wait
onSubmit(){
    if (this.isAddMode) {
      this.createMember()
    } else {
      this.updateMember();
    }
  }
private createMember(){
          //Data to create a member
          this.memberData= {
            "first_name":this.registrationForm.value.first_name,
            "middle_name":this.registrationForm.value.middle_name,
            "last_name":this.registrationForm.value.last_name,
            "email":this.registrationForm.value.email,  
            "sex": this.registrationForm.value.sex,
            "phone": this.registrationForm.value.phone,
            "password":this.registrationForm.value.password, 
          }
    
      this.membersService.createMember(this.memberData).subscribe(result => {
        this.memberID = result.id,
  
          //Data to create a member Profile inside the subscribe funx of create member
          this.memberProfileData= {
            "user": this.memberID,
            "status":this.registrationForm.value.status,
            "role":parseInt(this.registrationForm.value.role), 
            "club":this.registrationForm.value.club,  
            "is_post_tb": this.registrationForm.value.is_post_tb 
          }
        this.membersService.createMemberProfile(this.memberID,this.memberProfileData).
              subscribe(result => console.log('succeesful created Profile', result)),
              this.location.back();
        }
      );
    
}

private updateMember(){
   //Data to create a member
   this.memberData= {
    "first_name":this.registrationForm.value.first_name,
    "middle_name":this.registrationForm.value.middle_name,
    "last_name":this.registrationForm.value.last_name,
    "email":this.registrationForm.value.email,   
    "password":this.registrationForm.value.password
   }


  this.membersService.updateMember(this.memberID, this.memberData)
  .pipe(first())
  .subscribe({
      next: result => {
          // this.alertService.success('User updated', { keepAfterRouteChange: true });
          // this.router.navigate(['../../'], { relativeTo: this.route });
          this.memberID = result.id,
  
          //Data to create a member Profile inside the subscribe funx of create member
          this.memberProfileData= {
            "user": this.memberID,
            "tel":this.registrationForm.value.tel,
            "status":this.registrationForm.value.status,
            "fee_status":this.registrationForm.value.fee_status,
            "role":this.registrationForm.value.role, 
            "club":this.registrationForm.value.club,    
          }
        this.membersService.updateMemberProfile(this.memberID,this.memberProfileData)
            .pipe(first())
            .subscribe(result => console.log('succeesful created Profile', result)),
            this.location.back();
          
      },
      error: error => {
          // this.alertService.error(error);
          // this.loading = false;
      }
  });
  

}
  
}
