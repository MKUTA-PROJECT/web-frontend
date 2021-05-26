import { Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-memberdetail',
  templateUrl: './memberdetail.component.html',
  styleUrls: ['./memberdetail.component.scss']
})
export class MemberdetailComponent{

  constructor() { }
  
  @Input() memberData: any;
  @Output() editMember = new EventEmitter();
}
