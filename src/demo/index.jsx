import { useState } from 'react';
import WorkFlow, { Background, Controls, Connector } from 'workflow/core';
import './style.css';

function CustomNode({ data, id, selected }) {
  return (
    <div className={`custom-node ${selected ? 'selected-node' : ''}`}>
      <Connector position="left" type="target" nodeId={id} />
      <Connector
        position="right"
        type="source"
        nodeId={id}
        onConnect={data.onConnect}
        isValidConnection={data.isValidConnection}
      />
      <span fontWeight={500} fontSize="14px">
        {data.text}
      </span>
    </div>
  );
}

function InfoModal({ data, id }) {
  return (
    <div className="info-modal">
      <h1>
        <span className="underlined underline-clip">Workflow</span>
      </h1>
    </div>
  );
}

const initialNodes = [
  {
    id: '90',
    type: 'infoModal',
    position: { x: 1050, y: 50 },
    width: 300,
    height: 300,
    freezed: true,
  },
  {
    id: '1',
    type: 'custom',
    position: { x: 100, y: 100 },
    width: 200,
    height: 50,
    data: { text: 1, onConnect: e => console.log(e) },
  },
  {
    id: '2',
    type: 'custom',
    position: { x: 400, y: 200 },
    width: 200,
    height: 50,
    data: { text: 2 },
  },
  {
    id: '3',
    type: 'custom',
    position: { x: 600, y: 100 },
    width: 200,
    height: 50,
    data: { text: 3 },
  },
  {
    id: '4',
    type: 'custom',
    position: { x: 100, y: 300 },
    width: 200,
    height: 50,
    data: { text: 4 },
  },
];

const initialEdges = [
  { id: '1-edge-2', source: '1', target: '2', label: '1-2', type: 'straight' },
  { id: '1-edge-3', source: '1', target: '3', label: '1-3', type: 'straight' },
  { id: '2-edge-4', source: '2', target: '4', label: '2-4', type: 'straight', variant: 'dashed' },
  { id: '3-edge-4', source: '3', target: '4', label: '3-4', type: 'straight' },
];

const nodeTypesMapping = {
  custom: CustomNode,
  infoModal: InfoModal,
};

function Demo() {
  const [edges, setEdges] = useState(initialEdges);
  const [nodes, setNodes] = useState(initialNodes);

  const onNodeChanges = evt => {
    const { id, type, position } = evt;

    if (type === 'position') {
      setNodes(prev => {
        return prev.map(node => (node.id === id ? { ...node, position } : node));
      });
    }

    if (type === 'remove') {
      setNodes(prev => {
        return prev.filter(node => node.id !== id);
      });
    }
  };

  const onEdgeChanges = evt => {
    const { id, type } = evt;

    if (type === 'remove') {
      setEdges(prev => {
        return prev.filter(edge => edge.id !== id);
      });
    }
  };

  const onConnect = d => {
    setEdges(edges => [...edges, d]);
  };

  return (
    <div className="App" style={{ height: '100vh', width: '100vw' }}>
      <WorkFlow
        distance={5}
        nodes={nodes}
        edges={edges}
        onNodeChanges={onNodeChanges}
        onEdgeChanges={onEdgeChanges}
        nodeTypesMapping={nodeTypesMapping}
        onConnect={onConnect}
      >
        <Background type={'dotted'} />
        <Controls />
      </WorkFlow>
    </div>
  );
}

export default Demo;
