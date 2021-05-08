import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { ClubsService } from 'src/app/shared/services/clubs/clubs.service';
import { SupervisorService } from 'src/app/shared/services/supervisor/supervisor.service';
import { ClubsComponent } from '../clubs.component';


@Component({
  selector: 'app-clubform',
  templateUrl: './clubform.component.html',
  styleUrls: ['./clubform.component.scss']
})
export class ClubformComponent implements OnInit {

  
  constructor(private fb: FormBuilder, private clubsService: ClubsService,
              private SupervisorService: SupervisorService, private router: Router) { }

  supervisors = this.SupervisorService.allSupervisors()

  registrationForm = this.fb.group({
    name:  ['',[Validators.required]],
    phone: ['',[Validators.required]],
    email: ['',[Validators.required,Validators.email,]],
    health_facility: ['',[Validators.required]],
    office: ['',[Validators.required]],
    zone: ['',[Validators.required]],
    region: ['',[Validators.required]],
    district: ['',[Validators.required]],
    sub_district: [''],
    ward: ['',[Validators.required]],
    street: ['',[Validators.required]],
    supervisor: [ ,[Validators.required]],
  })    
  get altClubTel(){
    return this.registrationForm.get('clubtel') as FormArray;
  }
  addAltClubTell(){
    this.altClubTel.push(this.fb.control(''));
  }
  getErrorMessage() {
    if (this.registrationForm.get('email').hasError('required')) {
      return 'You must enter a value for email';
    }

    return this.registrationForm.get('email').hasError('email') ? 'Not a valid email' : '';
  }

  ngOnInit(): void {
  
  }

// create a club
  onSubmit(){
  
      this.clubsService.createClub(this.registrationForm.value).subscribe(result => 
      console.log('succeesful created', result));
      this.router.navigateByUrl('/clubs');
      console.log(this.registrationForm.value);
    }
    
  allSupervisors(){
      this.SupervisorService.allSupervisors().subscribe(supervisor => this.supervisors = supervisor);
  }
}
