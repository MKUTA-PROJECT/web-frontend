import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-clubmembers',
  templateUrl: './clubmembers.component.html',
  styleUrls: ['./clubmembers.component.scss']
})
export class ClubmembersComponent  {
  constructor(private router: Router) {}

  displayedColumns: string[] = ['id', 'first_name', 'middle_name', 'last_name', 'tel','status','fee_status'];
  @Input() dataSource: any;
  
    // On clicking the row data, load this method
    selectedMember(id) {
      this.router.navigate(['/members', id]);  //this for navigation with id
    }


}
