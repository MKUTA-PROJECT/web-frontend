import { AfterViewInit, Component, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ClubsService } from '../shared/services/clubs/clubs.service';
import { SupervisorService } from 'src/app/shared/services/supervisor/supervisor.service';
import { clubArray } from '../_model/clubArray';
import { LookupService } from '../shared/services/lookup/lookup.service';

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

  constructor(private clubsService: ClubsService,
    private SupervisorService: SupervisorService, 
    private router: Router, 
    private route:ActivatedRoute,
    private LookupService: LookupService) {
   
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
    this.router.navigate(['/clubs', id]);  //this for navigation with id
  }

  // club registration function
  registerClub(){
    this.router.navigateByUrl('/clubs/form');
  }
  // Below are service access methods for CRUID
  ELEMENT_DATA: clubArray[]=[];
  allClubs(){
    this.clubsService.allClubs().subscribe(clubs =>
       {this.ELEMENT_DATA = clubs

        for(let i=0;i<this.ELEMENT_DATA.length;i++){ //to return the name of supervisor instead of  the id
          this.SupervisorService.findSupervisor(this.ELEMENT_DATA[i].supervisor).subscribe(
              data=>{
                let name:{ first_name: any;last_name: any; }
                name = data
                this.ELEMENT_DATA[i].supervisor= name.first_name + " " + name.last_name
              }
             )

          this.LookupService.getLocation(this.ELEMENT_DATA[i].id).subscribe(data=>{
            this.ELEMENT_DATA[i].zone = data.zone;
            this.ELEMENT_DATA[i].region = data.region;
            this.ELEMENT_DATA[i].district = data.district;
            this.ELEMENT_DATA[i].sub_district = data.subdistrict;
            this.ELEMENT_DATA[i].ward = data.ward;
            this.ELEMENT_DATA[i].street = data.street_or_village;
            this.ELEMENT_DATA[i].facility = this.ELEMENT_DATA[i].health_facility_name;
          })
          
        }
       console.log(this.ELEMENT_DATA)
        this.dataSource.data = this.ELEMENT_DATA
      });
  }
  
  getClub(clubId){
    this.clubsService.findClub(clubId);
  }

  createClub(club){
    return this.clubsService.createClub;
  }

 
}