import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClubsService } from 'src/app/shared/services/clubs/clubs.service';
import { SupervisorService } from 'src/app/shared/services/supervisor/supervisor.service';
import { first } from 'rxjs/operators';
import { AlertService } from 'src/app/shared/_alert';

@Component({
  selector: 'app-clubform',
  templateUrl: './clubform.component.html',
  styleUrls: ['./clubform.component.scss']
})
export class ClubformComponent implements OnInit {
  clubId : string;
  isAddMode: boolean;
  
  constructor
  ( private fb: FormBuilder,
    private clubsService: ClubsService,
    private SupervisorService: SupervisorService,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService,
  ) { }

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

  getErrorMessage() {
    if (this.registrationForm.get('email').hasError('required')) {
      return 'You must enter a value for email';
    }

    return this.registrationForm.get('email').hasError('email') ? 'Not a valid email' : '';
  }

  ngOnInit(): void {
    this.clubId = this.route.snapshot.params['id'];
    this.isAddMode = !this.clubId;

    // Check if it is Create Or Update
    if  (!this.isAddMode) {
    this.clubsService.findClub(this.clubId).pipe(first()).subscribe(x => this.registrationForm.patchValue(x));
    }
  
  }

// create a club
  onSubmit(){
    // reset alerts on submit
    // this.alertService.clear();

    if (this.isAddMode) {
        this.createClub()
      } else {
        this.updateClub();
      }
        
    }
    
  allSupervisors(){
      this.SupervisorService.allSupervisors().subscribe(supervisor => this.supervisors = supervisor);
  }

  private createClub(){
    this.clubsService.createClub(this.registrationForm.value).subscribe(result => 
      console.log('succeesful created', result));
      this.router.navigateByUrl('/clubs');
      console.log(this.registrationForm.value);
  }

  private updateClub() {
    this.clubsService.updateClub(this.clubId, this.registrationForm.value)
        .pipe(first())
        .subscribe({
            next: () => {
                this.alertService.success('Club updated', { keepAfterRouteChange: true });
                this.router.navigate(['/clubs'], { relativeTo: this.route });
                // this.router.navigateByUrl('/clubs');
            },
            error: error => {
                // this.alertService.error(error);
                // this.loading = false;
            }
        });
  }
}
