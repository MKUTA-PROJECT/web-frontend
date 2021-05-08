import { Component, AfterViewInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { MemberService } from '../shared/services/member/member.service';

export interface memberArray {
  id: any;
  first_name: any;
  middle_name: any;
  last_name: any;
  email: any;
  user: any;
  date_joined: any;
  role: any;
  status: any;
  fee_status: any;
  tel: any;
  timestamp: any;
  club: any;
}
@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements AfterViewInit {

  displayedColumns: string[] = ['id', 'first_name', 'middle_name', 'last_name','club','role','tel',
                               'email', 'status', 'fee_status',];
  dataSource: MatTableDataSource<memberArray>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  memberValue: memberArray[];

  constructor(private router: Router, private route:ActivatedRoute, private memberService: MemberService) { 
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(this.memberValue);
  }

  ngAfterViewInit(): void {
    this.allMembers();
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
    selectedMember(id) {
      this.router.navigate(['/members', id]);  //this for navigation with id
    }
  
    // Member registration function
    registerMember(){
      this.router.navigateByUrl('/members/form');
    }
    // Below are service access methods for CRUID
    allMembers(){
      this.memberService.allMembers().subscribe(members => {this.dataSource.data = members, console.log(members)});
    }
    
    // getClub(clubId){
    //   this.clubsService.findClub(clubId);
    // }
  
    // createClub(club){
    //   return this.clubsService.createClub;
    // }

}
