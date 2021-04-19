import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ClubsService } from '../shared/services/clubs/clubs.service';

export interface clubArray {
  id: any;
  name: any;
  facility: any;
  zone: any;
  region: any;
  district: any;
  sub_district: any;
  ward: any;
  street: any;
  suprvisor: any;
}

@Component({
  selector: 'app-clubs',
  templateUrl: './clubs.component.html',
  styleUrls: ['./clubs.component.scss']
})


export class ClubsComponent implements AfterViewInit {
  
  displayedColumns: string[] = ['id', 'name', 'facility', 'zone','region', 'district', 'sub_district', 'ward','street', 'supervisor'];
  dataSource: MatTableDataSource<clubArray>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  clubValue: clubArray[];

  constructor(private clubsService: ClubsService, private router: Router, private route:ActivatedRoute) {
   
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(this.clubValue);
  }

  ngAfterViewInit() {
    this.allClubs();
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
  selectedClub(id) {
    // this.router.navigateByUrl('/clubs', id);  this is for navigation with url

    this.router.navigate(['/clubs', id]);  //this for navigation with id
  }

  // club registration function
  registerClub(){
    this.router.navigateByUrl('/clubs/form');
  }
  // Below are service access methods for CRUID
  allClubs(){
    this.clubsService.allClubs().subscribe(clubs => this.dataSource.data = clubs);
  }
  
  getClub(clubId){
    this.clubsService.findClub(clubId);
  }

  createClub(club){
    return this.clubsService.createClub;
  }


}