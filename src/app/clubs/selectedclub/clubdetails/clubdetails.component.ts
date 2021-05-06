import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ClubsService } from 'src/app/shared/services/clubs/clubs.service';
import { SupervisorService } from 'src/app/shared/services/supervisor/supervisor.service';

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
}
