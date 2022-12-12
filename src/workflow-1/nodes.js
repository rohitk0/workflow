const defaultNodes = [
  {
    x: 100,
    y: 100,
    height: 68,
    width: 300,
    children: [
      {
        x: 600,
        y: 300,
        height: 68,
        width: 300,
        arrowText: 'Send from',
        children: [
          {
            x: 950,
            y: 300,
            height: 68,
            width: 300,
            arrowText: 'Send from',
          },
        ],
      },
      {
        x: 500,
        y: 500,
        height: 68,
        width: 300,
        arrowText: 'Sent to',
      },
    ],
  },
];

export default defaultNodes;
