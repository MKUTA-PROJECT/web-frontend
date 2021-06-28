import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { EChartsOption } from 'echarts';
import { ClientsService } from '../shared/services/client/clients.service';
import { InfoService } from '../shared/services/info/info.service';
import { Info } from '../_model/Info';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
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

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });
  ngOnInit(): void {
    this.getInfo()
    this.initialGraphs()
  }

  getClients(){

  }

  getInfo(){
    this.infoService.allClubs().subscribe(info =>{
      this.allInfo = info ,
      console.log(this.allInfo)
    }
     )
  }
  
  // Function to plot the initial graph
  initialGraphs(){

    var seriesLabel = {
      show: true
  }
  
    this.chartOption= {
      tooltip : {
        trigger: 'axis'
      },
      title: {
        text: 'TB Info & Education'
    },
      legend: {
        data: ['Above 15', 'Below 15']
      },
      grid: {
        left: 100
    },
      yAxis: {
        type: 'category',
        data: ['Male', 'Female'],
      },
      xAxis: {
        type: 'value',
      },
      series: [
        {
            name: 'Above 15',
            type: 'bar',
            data: [165, 170],
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
            data: [150, 105]
        },
    ],
    };

    this.chartOption2= {
      tooltip : {
        trigger: 'axis'
      },
      legend: {
          top: '5%',
          left: 'center'
      },
      yAxis: {
        type: 'category',
        data: ['15 - 19', '20 - 24', '25 - 29', '30+'],
        
        axisLabel: {
          interval: 0,
          rotate: 30 //If the label names are too long you can manage this by rotating the label.
          
        }
      },
      xAxis: {
        type: 'value',
      },
      series: [
        {
          data:[10,10,10,10],
          type: 'bar',
          
        },
      ],
    };
  }
  
    // Function to Update the  graph 1
    updateGraph1(){
      this.dynamicData = {
        tooltip : {
          trigger: 'axis'
        },
        legend: {
            top: '5%',
            left: 'center'
        },
        yAxis: {
          type: 'category',
          data: ['15 - 19', '20 - 24', '25 - 29', '30+'],
          
          axisLabel: {
            interval: 0,
            rotate: 30 //If the label names are too long you can manage this by rotating the label.
            
          }
        },
        xAxis: {
          type: 'value',
        },
        series: [
          {
            data: '',
            type: 'bar',
            
          },
        ],
      }
    }
    // Function to update the graph 2
    updateGraph2(value1, value2){
      this.dynamicData1 = {
        tooltip : {
          trigger: 'axis'
        },
        legend: {
            top: '5%',
            left: 'center'
        },
        yAxis: {
          type: 'category',
          data: value1,
          
          axisLabel: {
            interval: 0,
            rotate: 30 //If the label names are too long you can manage this by rotating the label.
            
          }
        },
        xAxis: {
          type: 'value',
        },
        series: [
          {
            data: value2,
            type: 'bar',
            
          },
        ],
      }
    }
}
