import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StaffService } from 'src/app/shared/services/staff/staff.service';

@Component({
  selector: 'app-staffform',
  templateUrl: './staffform.component.html',
  styleUrls: ['./staffform.component.scss']
})
export class StaffformComponent implements OnInit {

  constructor(private fb: FormBuilder, private router: Router, private staffService: StaffService) { }

  ngOnInit(): void {
  }

  // only fill the fields with no default value
  registrationForm = this.fb.group({
    first_name:  ['',[Validators.required]],
    middle_name: ['',[Validators.required]],
    last_name: ['',[Validators.required]],
    email: ['',[Validators.required,Validators.email,]],
    position: ['',[Validators.required]],
    status: ['',[Validators.required]],
    tel: ['',[Validators.required]],
  }) 

  getErrorMessage() {
    if (this.registrationForm.get('email').hasError('required')) {
      return 'You must enter a value for email';
    }
    return this.registrationForm.get('email').hasError('email') ? 'Not a valid email' : '';
  }
  staffData: { first_name: any; middle_name: any; last_name: any; email: any; roles: any; }
  staffProfileData: { user: any; tel: any; status: any; position: any;}
  staffID: any
  async onSubmit(){
    //Data to create a member
    this.staffData= {
      "first_name":this.registrationForm.value.first_name,
      "middle_name":this.registrationForm.value.middle_name,
      "last_name":this.registrationForm.value.last_name,
      "email":this.registrationForm.value.email,
      "roles": 2,   
    }

this.staffService.createStaff(this.staffData).subscribe(result => {
  this.staffID = result.id,

    //Data to create a member Profile inside the subscribe funx of create member
    this.staffProfileData= {
      "user": this.staffID,
      "tel":this.registrationForm.value.tel,
      "status":this.registrationForm.value.status,
      "position":this.registrationForm.value.position, 
    }
  this.staffService.createStaffProfile(this.staffProfileData).
        subscribe(result => console.log('succeesful created Profile', result))
        this.router.navigateByUrl('/staffs');
  }
);

}

}
