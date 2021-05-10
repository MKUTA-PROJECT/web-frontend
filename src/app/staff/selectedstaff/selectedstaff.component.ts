import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StaffService } from 'src/app/shared/services/staff/staff.service';

@Component({
  selector: 'app-selectedstaff',
  templateUrl: './selectedstaff.component.html',
  styleUrls: ['./selectedstaff.component.scss']
})
export class SelectedstaffComponent implements OnInit {

  constructor(private staffsService: StaffService,private route: ActivatedRoute) { }

  // staff details area
  staffId : number;
  staffData: any;

  ngOnInit(): void {
  this.staffId = this.route.snapshot.params['id'];
  this.getStaff()
  }

  // This is for staff details child
  getStaff(){
    this.staffsService.findStaff(this.staffId).subscribe(data => {this.staffData = Object.assign({}, ...data),  console.log(data)});
  }
  
    
}
