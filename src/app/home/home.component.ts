import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { EChartsOption } from 'echarts';
import { ClientsService } from '../shared/services/client/clients.service';
import { InfoService } from '../shared/services/info/info.service';
import { Info } from '../_model/Info';
import { Client } from '../_model/Client';

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
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [

    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
      { provide: MAT_DATE_FORMATS, useValue: DateFormats }

  ],
})
export class HomeComponent implements OnInit {
  chartOption : EChartsOption
  chartOption2 : EChartsOption
  dynamicData
  dynamicData1

  //All Info
  allInfo : Info[]
  constructor(
    private clientService: ClientsService,
    private infoService: InfoService
  ) { }

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
    
    let value1 = await this.infoService.findInfo(formattedStartDate, formattedendDate).toPromise()
    let value2 = await this.clientService.findClient(formattedStartDate, formattedendDate).toPromise()
    let info = this.getSumOfInfo(value1)
    let screened = this.getTotalCount(value2)
    this.plotGraph(info, screened)
  }
  ngOnInit(): void {
    this.initialGraph()
  }
  

  async initialGraph(){
    let info = await this.getInfo();
    let screened = await this.getClients()
    this.plotGraph(info, screened)

  }
// Initial get of Screening Data when the graph is first loaded
  async getClients() {
    let values = await this.clientService.allClients().toPromise()
    let values2 = this.getTotalCount(values)
    return values2
  }

// Initial get of Info when the graph is first loaded
  async getInfo(){
    let results1 = await this.infoService.allClubs().toPromise()
    let results = this.getSumOfInfo(results1)
    return results
  }
// Function to calculate total screened, suspects and +ve
  getTotalCount(value : Client[]){
    let clients = value
    let totalScreened = clients.length
    let suspect = clients.filter(it => it.tb_suspect == true).length
    let positive = clients.filter(it => it.tb_status == true).length

    return [totalScreened, suspect, positive]

  }
  // Fuction to count the number of individual under each age group
  getSumOfInfo(value : Info[]){
    let currntInfo = value 
    let female_below_15: number = currntInfo.map(a => a.female_below_15).reduce(function(a, b){return a + b;}, 0);
    let female_above_15: number = currntInfo.map(a => a.female_above_15).reduce(function(a, b){return a + b;}, 0);
    let male_below_15: number = currntInfo.map(a => a.male_below_15).reduce(function(a, b){return a + b;}, 0);
    let male_above_15: number = currntInfo.map(a => a.male_above_15).reduce(function(a, b){return a + b;}, 0);
    return  [[female_above_15,male_above_15], [female_below_15,male_below_15]]
  }
  
  // Function to plot the initial graph
  plotGraph(value1, value2){

    var seriesLabel = {
      show: true
  }
    let chart1 : EChartsOption = {
      tooltip : {
        trigger: 'axis'
      },
      title: {
        text: 'TB Info & Education',
        left: 'center',
    },
    toolbox: {
      show: true,
      feature: {
          mark: {show: true},
          dataView: {show: true, readOnly: false},
          restore: {show: true},
          saveAsImage: {show: true}
      }
  },
      legend: {
        data: ['Above 15', 'Below 15'],
        top: 'bottom'
      },
      grid: {
        left: 100
    },
      yAxis: {
        type: 'category',
        data: ['Female', 'Male'],
      },
      xAxis: {
        type: 'value',
      },
      series: [
        {
            name: 'Above 15',
            type: 'bar',
            data: value1[0],
            label: seriesLabel,
            markPoint: {
                symbolSize: 1,
                symbolOffset: [0, '50%'],
                label: {
                    formatter: '{a|{a}\n}{b|{b} }{c|{c}}',
                    backgroundColor: 'rgb(242,242,242)',
                    borderColor: '#aaa',
                    borderWidth: 1,
                    borderRadius: 4,
                    padding: [4, 10],
                    lineHeight: 26,
                    // shadowBlur: 5,
                    // shadowColor: '#000',
                    // shadowOffsetX: 0,
                    // shadowOffsetY: 1,
                    position: 'right',
                    distance: 20,
                    rich: {
                        a: {
                            align: 'center',
                            color: '#fff',
                            fontSize: 18,
                            textShadowBlur: 2,
                            textShadowColor: '#000',
                            textShadowOffsetX: 0,
                            textShadowOffsetY: 1,
                            textBorderColor: '#333',
                            textBorderWidth: 2
                        },
                        b: {
                            color: '#333'
                        },
                        c: {
                            color: '#ff8811',
                            textBorderColor: '#000',
                            textBorderWidth: 1,
                            fontSize: 22
                        }
                    }
                }
            }
        },
        {
            name: 'Below 15',
            type: 'bar',
            label: seriesLabel,
            data: value1[1]
        },
    ],
    };
    
    if(!this.chartOption){
      this.chartOption = chart1
    }
    else{
      this.dynamicData = chart1
    }

    let chart2 : EChartsOption = {
      legend: {
      top: 'bottom'
    },
    tooltip : {
      trigger: 'item',
      formatter: function (params) {
        
        return `${params.seriesName}<br />
                ${params.name}: ${params.data.value} (${params.percent}%)<br />
                ${params.data.name1}: ${params.data.value1}`;
      }
    },
    title: {
      text: 'Screening Data',
      left: 'center',
  },
    toolbox: {
        show: true,
        feature: {
            mark: {show: true},
            dataView: {show: true, readOnly: false},
            restore: {show: true},
            saveAsImage: {show: true}
        }
    },
    series: [
        {
            name: 'CLients',
            type: 'pie',
            radius: '70%',
            center: ['50%', '50%'],
            roseType: 'area',
            itemStyle: {
                borderRadius: 8
            },
            data: [
                {value: value2[0], name: 'Total Screened'},
                {value: value2[1], name: 'TB Suspect'},
                {value: value2[2], name: 'TB +ve'}, 
            ]
        }
    ]
    };

    if(!this.chartOption2){
      this.chartOption2 = chart2
    }
    else{
      this.dynamicData1 = chart2
    }
  }
  
}
