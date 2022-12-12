const initialNodes = [
  { id: '1', x: 100, y: 100, width: 200, height: 50, data: { text: 1 } },
  { id: '2', x: 400, y: 200, width: 200, height: 50, data: { text: 2 } },
  { id: '3', x: 600, y: 100, width: 200, height: 50, data: { text: 3 } },
  { id: '4', x: 100, y: 300, width: 200, height: 50, data: { text: 4 } },
  { id: '5', x: 100, y: 600, width: 200, height: 50, data: { text: 5 } },
  { id: '6', x: 600, y: 400, width: 200, height: 50, data: { text: 6 } },
  { id: '7', x: 450, y: 400, width: 200, height: 50, data: { text: 7 } },
  { id: '8', x: 950, y: 400, width: 200, height: 50, data: { text: 8 } },
  { id: '9', x: 450, y: 450, width: 200, height: 50, data: { text: 9 } },
  { id: '10', x: 950, y: 550, width: 200, height: 50, data: { text: 10 } },
];

const initialEdges = [
  { sourceId: '1', targetId: '2' },
  { sourceId: '1', targetId: '3' },
  { sourceId: '2', targetId: '3' },
  { sourceId: '2', targetId: '4' },
  { sourceId: '4', targetId: '6' },
  { sourceId: '3', targetId: '5' },
  { sourceId: '5', targetId: '6' },
  { sourceId: '7', targetId: '8' },
  { sourceId: '9', targetId: '10' },
];

export { initialNodes, initialEdges };
