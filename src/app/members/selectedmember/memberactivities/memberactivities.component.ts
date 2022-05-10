import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-memberactivities',
  templateUrl: './memberactivities.component.html',
  styleUrls: ['./memberactivities.component.scss']
})
export class MemberactivitiesComponent {
  constructor(private router: Router) {}

  displayedColumns: string[] = ['id', 'date_paid','amount',];

  @Input() contribution: any;
  @Input() memberId: any;
  @Output() editContribution = new EventEmitter();
  
    // On clicking the row data, load this method
    selectedContribution(id) {
      this.router.navigate(['/memberscontrib/', id]);  //this for navigation with id
    }

    // Member registration function
    addContribution(memberId){
      console.log(this.memberId, 'Thiiiiiiis')
      this.router.navigate(['/memberscontrib/form/',memberId]);
    }
}
