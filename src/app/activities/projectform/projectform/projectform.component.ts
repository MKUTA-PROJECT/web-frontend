import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { first } from 'rxjs/operators';
import { ProjectsService } from 'src/app/shared/services/projects/projects.service';
import { AlertService } from 'src/app/shared/_alert';

@Component({
  selector: 'app-projectform',
  templateUrl: './projectform.component.html',
  styleUrls: ['./projectform.component.scss']
})
export class ProjectformComponent implements OnInit {

  projectId : string;
  isAddMode: boolean;
  
  constructor 
  ( private fb: FormBuilder,
    private projectsService: ProjectsService,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService,
  ) { }


  registrationForm = this.fb.group({
    name:  ['',[Validators.required]],
    description: ['',[Validators.required]],
    start_date:new FormControl(),
    end_date: new FormControl(),
  })    



  ngOnInit(): void {
    this.projectId = this.route.snapshot.params['id'];
    this.isAddMode = !this.projectId;

    // Check if it is Create Or Update
    if  (!this.isAddMode) {
    this.projectsService.findProject(this.projectId).pipe(first()).subscribe(x => this.registrationForm.patchValue(x));
    }
  
  }

// create a project
  onSubmit(){
    // reset alerts on submit
    // this.alertService.clear();

    if (this.isAddMode) {
        this.createProject()
      } else {
        this.updateProject();
      }
        
    }
    


  private createProject(){
    const startDate = new Date(this.registrationForm.get('start_date').value );
    const formattedStartDate = moment(startDate).format("YYYY-MM-DD");

    const endDate = new Date(this.registrationForm.get('end_date').value );
    const formattedendDate = moment(endDate).format("YYYY-MM-DD");

    const name = this.registrationForm.get('name').value
    const description = this.registrationForm.get('description').value
    const funder = this.registrationForm.get('funder').value

    const values = {
      'name': name,
      'description': description,
      'funder': funder,
      'start_date': formattedStartDate,
      'end_date': formattedendDate,
    }


    this.projectsService.createProject(values).subscribe(result => 
      console.log('succeesful created', result));
      this.router.navigateByUrl('/projects');
      
  }

  private updateProject() {

    const startDate = new Date(this.registrationForm.get('start_date').value );
    const formattedStartDate = moment(startDate).format("YYYY-MM-DD");

    const endDate = new Date(this.registrationForm.get('end_date').value );
    const formattedendDate = moment(endDate).format("YYYY-MM-DD");

    const name = this.registrationForm.get('name').value
    const description = this.registrationForm.get('description').value
    const funder = this.registrationForm.get('funder').value

    const values = {
      'name': name,
      'description': description,
      'funder': funder,
      'start_date': formattedStartDate,
      'end_date': formattedendDate,
    }

    this.projectsService.updateProject(this.projectId, values)
        .pipe(first())
        .subscribe({
            next: () => {
                this.alertService.success('Project updated', { keepAfterRouteChange: true });
                this.router.navigate(['/activities'], { relativeTo: this.route });
            },
            error: error => {
                // this.alertService.error(error);
                // this.loading = false;
            }
        });
  }
}
