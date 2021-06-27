import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StaffService } from 'src/app/shared/services/staff/staff.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-staffform',
  templateUrl: './staffform.component.html',
  styleUrls: ['./staffform.component.scss']
})
export class StaffformComponent implements OnInit {

  staffData: { first_name: any; middle_name: any; last_name: any; email: any; roles: any; password: any; }
  staffProfileData: { user: any; tel: any; status: any; position: any;}
  staffID: any
  isAddMode: boolean;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder, 
    private router: Router, 
    private staffService: StaffService) { }

  ngOnInit(): void {
    this.staffID = this.route.snapshot.params['id'];
    this.isAddMode = !this.staffID;

    // Check if it is Create Or Update
    if  (!this.isAddMode) {
      this.staffService.findStaff(this.staffID).pipe(first())
        .subscribe(x =>{
          console.log(x) 
          this.registrationForm.patchValue(Object.assign({}, ...x)) 
        }       
        )
    }

    // password not required in edit mode
    const passwordValidators = [Validators.minLength(6)];
    if (this.isAddMode) {
        passwordValidators.push(Validators.required);
    }
   
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
    password: ['', [Validators.required, Validators.minLength(6),this.isAddMode ? Validators.required : Validators.nullValidator]],
    confirmPassword: ['', this.isAddMode ? Validators.required : Validators.nullValidator],
  }) 

  getErrorMessage() {
    if (this.registrationForm.get('email').hasError('required')) {
      return 'You must enter a value for email';
    }
    return this.registrationForm.get('email').hasError('email') ? 'Not a valid email' : '';
  }

  onSubmit(){
    if (this.isAddMode) {
      this.createStaff()
    } else {
      this.updateStaff();
    }

  }

  private createStaff(){
        //Data to create a member
        this.staffData= {
          "first_name":this.registrationForm.value.first_name,
          "middle_name":this.registrationForm.value.middle_name,
          "last_name":this.registrationForm.value.last_name,
          "email":this.registrationForm.value.email,
          "roles": 2,
          "password": this.registrationForm.value.password  
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

  private updateStaff(){
   //Data to create a member
   this.staffData= {
    "first_name":this.registrationForm.value.first_name,
    "middle_name":this.registrationForm.value.middle_name,
    "last_name":this.registrationForm.value.last_name,
    "email":this.registrationForm.value.email,   
    "roles": 2,
    "password":this.registrationForm.value.password
   }


  this.staffService.updateStaff(this.staffID, this.staffData)
  .pipe(first())
  .subscribe({
      next: result => {
          // this.alertService.success('User updated', { keepAfterRouteChange: true });
          // this.router.navigate(['../../'], { relativeTo: this.route });
          this.staffID = result.id,
  
          //Data to create a member Profile inside the subscribe funx of create member
          this.staffProfileData= {
            "user": this.staffID,
            "tel":this.registrationForm.value.tel,
            "status":this.registrationForm.value.status,
            "position":this.registrationForm.value.position 
          }
        this.staffService.updateStaffProfile(this.staffID,this.staffProfileData)
            .pipe(first())
            .subscribe(result => console.log('succeesful created Profile', result)),
            this.router.navigateByUrl('/staffs');
          
      },
      error: error => {
          // this.alertService.error(error);
          // this.loading = false;
      }
  });
 
  }

}
