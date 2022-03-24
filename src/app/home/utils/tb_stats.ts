export const tbStats = {
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
          { value: 126, name: 'Post TB' },
          { value: 265, name: 'Non-TB' },
        ],
      },
    ],
  };