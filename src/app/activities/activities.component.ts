import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectsService } from '../shared/services/projects/projects.service';
import { project } from '../_model/project';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss']
})
export class ActivitiesComponent implements AfterViewInit {

  displayedColumns: string[] = ['id', 'name', 'description', 'start_date','end_date'];
  dataSource: MatTableDataSource<project>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  projectValue: project[];

  constructor(private projectsService: ProjectsService,private router: Router, private route:ActivatedRoute) {
   
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(this.projectValue);
  }

  ngAfterViewInit() {
    this.allProjects();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) { 
      this.dataSource.paginator.firstPage();
    }
  }
  
  // On clicking the row data, load this method
  selectedProject(id) {
    this.router.navigate(['/projects', id]);  //this for navigation with id
  }

  // Project registration function
  registerProject(){
    this.router.navigateByUrl('/projects/form');
  }
  // Below are service access methods for CRUID
  ELEMENT_DATA: project[]=[];
  allProjects(){
    this.projectsService.allProjects().subscribe(projects =>
       {this.ELEMENT_DATA = projects
       
        this.dataSource.data = this.ELEMENT_DATA
      });
  }
  
  getProject(projectId){
    this.projectsService.findProject(projectId);
  }


}
