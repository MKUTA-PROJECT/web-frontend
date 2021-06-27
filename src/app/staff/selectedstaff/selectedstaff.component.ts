import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StaffService } from 'src/app/shared/services/staff/staff.service';

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
  selector: 'app-selectedstaff',
  templateUrl: './selectedstaff.component.html',
  styleUrls: ['./selectedstaff.component.scss']
})
export class SelectedstaffComponent implements OnInit {

  constructor(
    private router: Router, 
    private staffsService: StaffService,
    private route: ActivatedRoute) { }

  // staff details area
  staffId : number;
  staffData: staffArray;

  ngOnInit(): void {
  this.staffId = this.route.snapshot.params['id'];
  this.getStaff()
  }

  // This is for staff details child

  getStaff(){
    this.staffsService.findStaff(this.staffId).subscribe(data => 
      { this.staffData = Object.assign({}, ...data)
        this.staffData.date_joined = this.staffData.date_joined.split("T")[0]
      });
  }

  editStaff(id){  
    this.router.navigate(["/staffs/form",id]); 
  }
  
    
}
