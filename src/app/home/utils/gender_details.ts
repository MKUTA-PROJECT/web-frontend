export const genderDetails =(a,b)=> {
  return {
    initOptions: {
      renderer: 'svg',
      width: 500,
      height: 'auto',
    },
    options: {
      color: ['#F7CCAC'],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: [
        {
          type: 'category',
          data: ['Male', 'Female'],
          axisTick: {
            alignWithLabel: false,
          },
        },
      ],
      yAxis: [
        {
          type: 'value',
        },
      ],
      series: [
        {
          name: 'People',
          type: 'bar',
          barWidth: '50%',
          data: [a, b],
        },
      ],
    },
  };
  
}