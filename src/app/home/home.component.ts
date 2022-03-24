import { Component, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import { ThemeOption } from 'ngx-echarts';
import { genderDetails } from './utils/gender_details';
import { countInterface, countRegisterInterface } from './utils/interfaces';
import { memberDetails } from './utils/member_details';
import { projectDetails } from './utils/projectDetails';
import { tbStats } from './utils/tb_stats';

export const DateFormats = {
  parse: {
    dateInput: ['YYYY-MM-DD'],
  },
  display: {
    dateInput: 'YYYY-MM-DD',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  countRegister: countRegisterInterface[];

  ngOnInit(): void {
    this.countRegister = this.getCountRegister();
  }

  /**
   * chart 1 - TB patients comparison
   */
  options = tbStats;

  /**
   *
   * @returns counts of the system entities
   */
  getCountRegister(): countRegisterInterface[] {
    return projectDetails;
  }

  /**
   * chart 2 - Project members and their assignments
   */
  initOpts = memberDetails.initOptions;
  options2 = memberDetails.options;

  /**
   * chart 3 - Total gender count
   */
  initOptsGender = genderDetails.initOptions;
  genderOptions = genderDetails.options;
}
