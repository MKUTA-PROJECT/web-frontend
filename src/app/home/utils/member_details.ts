export const memberDetails = {
    initOptions: {
        renderer: 'svg',
        width: 500,
        height: 'auto'
      },
    options: {
        color: ['#F7CCAC'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: ['New', 'Assigned', 'Not Assigned'],
            axisTick: {
              alignWithLabel: false
            }
          }
        ],
        yAxis: [{
          type: 'value'
        }],
        series: [{
          name: 'People',
          type: 'bar',
          barWidth: '80%',
          data: [163, 82, 200]
        }]
      }
};