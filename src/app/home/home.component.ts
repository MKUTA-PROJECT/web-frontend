import { AfterViewInit, Component, OnInit } from '@angular/core';
import { HomeService } from '../shared/services/home/home.service';
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
export class HomeComponent implements AfterViewInit {
  countRegister: countRegisterInterface[];
  dashboardData:any;
  options:any;
  initOpts:any;
  options2:any;
  initOptsGender:any;
  genderOptions:any;

  constructor(
    private HomeService: HomeService
  ){}

  ngAfterViewInit() {

    this.HomeService.DashboardSummary().subscribe(data=>{
      this.dashboardData = data,
      this.countRegister = this.getCountRegister();

      
      /**
       * chart 1 - TB patients comparison
       */
      this.options = tbStats(this.dashboardData?.post_tb.positive,this.dashboardData?.post_tb.negative);


      /**
       * chart 2 - Project members and their assignments
       */
      let response = memberDetails(10,20,30)
      this.initOpts = response.initOptions;
      this.options2 = response.options;

      /**
       * chart 3 - Total gender count
       */
      let response2 = genderDetails(this.dashboardData?.gender.male,this.dashboardData?.gender.female)
      this.initOptsGender =response2.initOptions;
      this.genderOptions = response2.options;
    })
    
  }

  

  /**
   *
   * @returns counts of the system entities
   */
  getCountRegister(): countRegisterInterface[] {
    console.log(this.dashboardData)
    return projectDetails(this.dashboardData?.projects,this.dashboardData?.clubs,this.dashboardData?.members,this.dashboardData?.staffs);
  }


}
