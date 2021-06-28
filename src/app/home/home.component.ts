import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { EChartsOption } from 'echarts';

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
  constructor() { }

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });
  ngOnInit(): void {
  }

  getClients(){

  }
  // Function to plot the initial graph
  initialGraphs(value1, value2){
    this.chartOption= {
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
