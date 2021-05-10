import { Component, AfterViewInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { StaffService } from '../shared/services/staff/staff.service';

export interface staffArray {
  id: any;
  first_name: any;
  middle_name: any;
  last_name: any;
  email: any;
  roles: any;
  user: any;
  date_joined: any;
  status: any;
  position: any;
  tel: any;
}



@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss']
})
export class StaffComponent implements AfterViewInit {

  displayedColumns: string[] = ['id', 'first_name', 'middle_name', 'last_name','position','tel',
  'email', 'status',];
  dataSource: MatTableDataSource<staffArray>;

@ViewChild(MatPaginator) paginator: MatPaginator;
@ViewChild(MatSort) sort: MatSort;

memberValue: staffArray[];

  constructor(private router: Router, private route:ActivatedRoute, private staffService: StaffService) {
     // Assign the data to the data source for the table to render
     this.dataSource = new MatTableDataSource(this.memberValue);
   }

  ngAfterViewInit(): void {
    this.allStaffs();
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
    selectedStaff(id) {
      this.router.navigate(['/staffs', id]);  //this for navigation with id
    } 
    // Staff registration function
    registerStaff(){
      this.router.navigateByUrl('/staffs/form');
    }
    // Below are service access methods for CRUID
    allStaffs(){
      this.staffService.allStaffs().subscribe(staffs => {this.dataSource.data = staffs, console.log(staffs)});
    }
}
