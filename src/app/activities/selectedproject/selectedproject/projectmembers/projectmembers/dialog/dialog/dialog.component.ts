import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA,MatDialogModule } from '@angular/material/dialog';
import { MemberService } from 'src/app/shared/services/member/member.service';
import { memberArray } from 'src/app/_model/member';
import { DialogData } from '../../projectmembers.component';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  members: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private memberService: MemberService,
    ) {}
    
    ngOnInit(): void {
      this.allMembers()
    }

    onNoClick(): void {
      this.dialogRef.close();
      
    }
    ELEMENT_DATA: memberArray[]=[];

    allMembers(){
      this.memberService.allMembers().subscribe(members => 
        {this.ELEMENT_DATA = members, console.log(this.ELEMENT_DATA)})}

    onSubmit(data){
      console.log(data)
    }
}


