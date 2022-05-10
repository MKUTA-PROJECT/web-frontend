import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { MemberService } from 'src/app/shared/services/member/member.service';
import { Payment } from 'src/app/_model/payment';
import { Location } from '@angular/common';
@Component({
  selector: 'app-paymentform',
  templateUrl: './paymentform.component.html',
  styleUrls: ['./paymentform.component.scss']
})
export class PaymentformComponent implements OnInit {
  memberID : string;
  isAddMode: boolean;
  registrationForm : FormGroup;
  

  constructor(
    private fb: FormBuilder, 
    private route: ActivatedRoute,
    private location: Location,

    private membersService: MemberService, ) { }

  memberContribution: Payment;

  ngOnInit(): void {
    this.memberID = this.route.snapshot.params['id'];
    this.isAddMode = !this.memberID;

    
    // Check if it is Create Or Update
    if  (!this.isAddMode) {
      this.membersService.findMember(this.memberID).pipe(first())
        .subscribe(x => 
          {this.memberContribution = x;
  
            this.registrationForm.patchValue(this.memberContribution)        
          })
    }
      // only fill the fields with no default value
  this.registrationForm = this.fb.group({
    amount:  ['',[Validators.required]],
    // member:  ['',[Validators.required]],
      }) 
       
  }

  // create a Member contrib
onSubmit(){
    if (this.isAddMode) {
      this.createContribution()
    } else {
      // this.updateMember();
      this.createContribution()
    }
  }

memberContrib:any;
private createContribution(){
          //Data to create a member contrib
          this.memberContrib= {
            "member":this.memberID,
            "amount":this.registrationForm.value.amount,
          }

          this.membersService.createMemberContribution(this.memberContrib).subscribe(data=>
            {console.log(data)
              this.location.back();
            })
}

}
