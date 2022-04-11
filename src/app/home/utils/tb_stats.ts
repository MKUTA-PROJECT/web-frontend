export const tbStats=(a,b)=> {
  return {
    tooltip: {
      trigger: 'item',
      formatter: '{c} {b} patients',
    },
    calculable: true,
    series: [
      {
        name: 'chart',
        type: 'pie',
        radius: [30, 120],
        roseType: 'pie-chart',
        data: [
          { value: a, name: 'Post TB' },
          { value: b, name: 'Non-TB' },
        ],
      },
    ],
  };
}