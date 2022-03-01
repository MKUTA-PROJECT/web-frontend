import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-projectdetails',
  templateUrl: './projectdetails.component.html',
  styleUrls: ['./projectdetails.component.scss']
})
export class ProjectdetailsComponent{

  constructor() { }

  
  @Input() projectId : number;
  @Input() projectData: any;
  @Output() editProject = new EventEmitter();

}
