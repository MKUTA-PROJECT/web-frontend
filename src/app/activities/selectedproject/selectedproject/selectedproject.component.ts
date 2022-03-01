import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectsService } from 'src/app/shared/services/projects/projects.service';
import { memberArray } from 'src/app/_model/member';

@Component({
  selector: 'app-selectedproject',
  templateUrl: './selectedproject.component.html',
  styleUrls: ['./selectedproject.component.scss']
})
export class SelectedprojectComponent implements OnInit {

  constructor(
    private router: Router, 
    private route: ActivatedRoute, 
    private projectsService: ProjectsService
    ) { }

  // chub details area
  ProjectId : number;
  projectData: any;

  // Project members area
  dataSource: memberArray[];

  ngOnInit(): void {
    this.ProjectId = this.route.snapshot.params['id'];
    this.getProject()
    this.allmembers()
  }
// This is for Project details child
  getProject(){
    this.projectsService.findProject(this.ProjectId).subscribe(data => {this.projectData = data});
  }


  // This is for Project members child
  allmembers(){
    this.projectsService.findProjectMembers(this.ProjectId).subscribe(data =>{ this.dataSource = data, console.log(this.dataSource)});
  }
  
  editProject(id){  
    this.router.navigate(["/projects/form",id]); 
  }

}
