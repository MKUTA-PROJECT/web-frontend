import { Component, Input} from '@angular/core';

@Component({
  selector: 'app-memberdetail',
  templateUrl: './memberdetail.component.html',
  styleUrls: ['./memberdetail.component.scss']
})
export class MemberdetailComponent{

  constructor() { }
  
  @Input() memberData: any;
}
