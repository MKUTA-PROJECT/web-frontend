import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-clubleaders',
  templateUrl: './clubleaders.component.html',
  styleUrls: ['./clubleaders.component.scss']
})
export class ClubleadersComponent{

  constructor() { }

  @Input() clubLeader: any;

}
