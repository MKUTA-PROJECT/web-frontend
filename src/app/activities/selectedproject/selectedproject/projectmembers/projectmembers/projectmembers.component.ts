import { Component, Inject, Input } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogComponent } from './dialog/dialog/dialog.component';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-projectmembers',
  templateUrl: './projectmembers.component.html',
  styleUrls: ['./projectmembers.component.scss']
})

export class ProjectmembersComponent {
  animal: string;
  name: string;
  constructor(private router: Router, public dialog: MatDialog) {}

  displayedColumns: string[] = ['id', 'first_name', 'middle_name', 'last_name', 'tel'];
  @Input() dataSource: any;
  
    // On clicking the row data, load this method
    selectedMember(id) {
      this.router.navigate(['/members', id]);  //this for navigation with id
    }

    // Member registration function
    registerMember(){
      const dialogRef = this.dialog.open(DialogComponent, {
        width: '30vw',
        data: {name: this.name, animal: this.animal},
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        this.animal = result;
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
    }
    
}

