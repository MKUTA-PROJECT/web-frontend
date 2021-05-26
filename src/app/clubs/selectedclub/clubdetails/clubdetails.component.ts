import { Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-clubdetails',
  templateUrl: './clubdetails.component.html',
  styleUrls: ['./clubdetails.component.scss']
})
export class ClubdetailsComponent  {

  constructor() { }

  @Input() clubId : number;
  @Input() clubData: any;
  @Input() supervisorData: any;
  @Output() editClub = new EventEmitter();
}
