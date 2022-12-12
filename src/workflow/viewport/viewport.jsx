import React from 'react';
import Edges from './Edges';
import Labels from './Labels';
import Nodes from './Nodes/nodes';
import useWorkFlowStore from '../store';
import './style.css';

function Viewport({ nodeTypesMapping }) {
  const { viewPortPos, currentZoom } = useWorkFlowStore(store => store);

  return (
    <div
      id="workflow-viewport"
      className="work-flow-viewport work-flow-container"
      style={{
        transform: `translate(${viewPortPos.x * currentZoom}px,${
          viewPortPos.y * currentZoom
        }px) scale(${currentZoom})`,
      }}
    >
      <Edges />
      <Labels />
      <Nodes nodeTypesMapping={nodeTypesMapping} />
    </div>
  );
}

export default Viewport;
