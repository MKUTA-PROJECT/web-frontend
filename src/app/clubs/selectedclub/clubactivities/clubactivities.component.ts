import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MomentDateModule, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { Moment } from 'moment';
import * as moment from 'moment';

export const DateFormats = {
  parse: {
      dateInput: ['YYYY-MM-DD']
  },
  display: {
      dateInput: 'YYYY-MM-DD',
      monthYearLabel: 'MMM YYYY',
      dateA11yLabel: 'LL',
      monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-clubactivities',
  templateUrl: './clubactivities.component.html',
  styleUrls: ['./clubactivities.component.scss'],
  providers: [

    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
      { provide: MAT_DATE_FORMATS, useValue: DateFormats }

  ],
})
export class ClubactivitiesComponent implements OnInit {

  constructor() { }

  pickerGroup = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });
// Button to filter by date
  async onFilter(){
    const startDate = new Date(this.pickerGroup.get('start').value );
    const formattedStartDate = moment(startDate).format("YYYY-MM-DD");

    const endDate = new Date(this.pickerGroup.get('end').value );
    const formattedendDate = moment(endDate).format("YYYY-MM-DD");
    console.log(formattedStartDate, formattedendDate)
    // let value = await this.clientService.findClient(formattedStartDate, formattedendDate).toPromise()
   
  }

  ngOnInit(): void {
  }

}
