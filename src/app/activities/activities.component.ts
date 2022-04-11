import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  Inject,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectsService } from '../shared/services/projects/projects.service';
import { project } from '../_model/project';

import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

export interface DialogData {
  animal: string;
  name: string;
  selected?: string;
}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
  styleUrls: ['dialog-overview-example-dialog.scss'],
})
export class DialogFilter {
  constructor(
    public dialogRef: MatDialogRef<DialogFilter>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onFilter(): void {
    console.log("On filter pressed")
    this.dialogRef.close();
  }
}

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss'],
})
export class ActivitiesComponent implements AfterViewInit {
  name: string = "Malik"
  animal: string;

  displayedColumns: string[] = [
    'id',
    'name',
    'funder',
    'description',
    'start_date',
    'end_date',
  ];
  dataSource: MatTableDataSource<project>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  projectValue: project[];

  constructor(
    public dialog: MatDialog,
    private projectsService: ProjectsService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(this.projectValue);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogFilter, {
      width: '50%',
      height: 'auto',
      data: { name: this.name, animal: this.animal, selected: 'option2' },
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('Dialog closed');
    });
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
    this.router.navigate(['/projects', id]); //this for navigation with id
  }

  // Project registration function
  registerProject() {
    this.router.navigateByUrl('/projects/form');
  }
  // Below are service access methods for CRUID
  ELEMENT_DATA: project[] = [];
  allProjects() {
    this.projectsService.allProjects().subscribe((projects) => {
      this.ELEMENT_DATA = projects;

      this.dataSource.data = this.ELEMENT_DATA;
    });
  }

  getProject(projectId) {
    this.projectsService.findProject(projectId);
  }
}
