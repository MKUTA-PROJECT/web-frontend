import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StaffService } from 'src/app/shared/services/staff/staff.service';
import { staff } from 'src/app/_model/staff';


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
  staffData: staff;

  ngOnInit(): void {
  this.staffId = this.route.snapshot.params['id'];
  this.getStaff()
  }

  // This is for staff details child

  getStaff(){
    this.staffsService.findStaff(this.staffId).subscribe(data => 
      { this.staffData = data;

      // Sex
      if (this.staffData.sex ===1){
        this.staffData.sex = "Male"
      }
      else {
        this.staffData.sex = "Female"
      }
      
      // Status
      if (this.staffData.status ==1){
        this.staffData.status ="Active"
      }
      else if (this.staffData.status ==2){
        this.staffData.status="Domant"
      }
      else if (this.staffData.status ==3){
        this.staffData.status="Dead"
      }
        this.staffData.date_joined = this.staffData.date_joined.split("T")[0]
      });
  }

  editStaff(id){  
    this.router.navigate(["/staffs/form",id]); 
  }
  
    
}
