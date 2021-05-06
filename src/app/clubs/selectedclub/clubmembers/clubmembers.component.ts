import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-clubmembers',
  templateUrl: './clubmembers.component.html',
  styleUrls: ['./clubmembers.component.scss']
})
export class ClubmembersComponent  {
  constructor() {}

  displayedColumns: string[] = ['id', 'first_name', 'middle_name', 'last_name', 'tel','status','fee_status'];
  @Input() dataSource: any;
  

  

}
