import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StaffService } from 'src/app/shared/services/staff/staff.service';
import { first } from 'rxjs/operators';
import { staff } from 'src/app/_model/staff';
import { LookupService } from 'src/app/shared/services/lookup/lookup.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-staffform',
  templateUrl: './staffform.component.html',
  styleUrls: ['./staffform.component.scss']
})
export class StaffformComponent implements OnInit {

  staffData: { first_name: any; middle_name: any; last_name: any; email: any; roles: any; password: any; sex:any; phone:any;}
  staffProfileData: { user: any; role: any;}
  staffID: any
  isAddMode: boolean;
  staff: staff;


  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder, 
    private location: Location, 
    private router: Router,
    private staffService: StaffService,
    private LookupService:LookupService) { }


    selectedRole: number;
    roles = this.LookupService.allStaffRoles()

  ngOnInit(): void {
    this.staffID = this.route.snapshot.params['id'];
    this.isAddMode = !this.staffID;

    // Check if it is Create Or Update
    if  (!this.isAddMode) {
      this.staffService.findStaff(this.staffID).pipe(first())
        .subscribe(x =>{
          this.staff = x; 
           // Profie data
           console.log(x)
            // Sex
            if (this.staff.sex ==1){
              this.staff.sex = "1"
            }
            else if (this.staff.sex ==2){
              this.staff.sex = "2"
            }
            
              this.LookupService.getStaffRole(this.staff.role).subscribe(roles => {
                this.selectedRole = roles.id
              })
          this.registrationForm.patchValue(this.staff) 
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
    role: ['',[Validators.required]],
    sex: ['',[Validators.required]],
    phone: ['',[Validators.required]],
    password: ['', [this.isAddMode ? Validators.required : Validators.nullValidator, Validators.minLength(6),]],
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
            "sex": this.registrationForm.value.sex,
            "phone": this.registrationForm.value.phone,
            "password":this.registrationForm.value.password, 
            "roles": 1
        }
    
    this.staffService.createStaff(this.staffData).subscribe(result => {
      this.staffID = result.id,
    
        //Data to create a member Profile inside the subscribe funx of create member
        this.staffProfileData= {
          "user": this.staffID,
          "role":this.registrationForm.value.role, 
        }
      this.staffService.createStaffProfile(this.staffID,this.staffProfileData).
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
    "sex": this.registrationForm.value.sex,
    "phone": this.registrationForm.value.phone,
    "password":this.registrationForm.value.password, 
    "roles": 1
   }


  this.staffService.updateStaff(this.staffID, this.staffData)
  .pipe(first())
  .subscribe({
      next: result => {
          this.staffID = result.id,
  
          //Data to create a member Profile inside the subscribe funx of create member
          this.staffProfileData= {
            "user": this.staffID,
            "role":this.registrationForm.value.role 
          }
        this.staffService.updateStaffProfile(this.staffID,this.staffProfileData)
            .pipe(first())
            .subscribe(result => console.log('succeesful udated Profile', this.staffProfileData)),
            this.location.back();
          
      },
      error: error => {
          // this.alertService.error(error);
          // this.loading = false;
      }
  });
 
  }

}
