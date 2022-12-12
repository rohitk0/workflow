import React from 'react';
import useWorkFlowStore from '../../store';
import edgesTypesMap from './edgeTypes/edgeTypesMap';

function NewEdge({ newEdge }) {
  const EdgeComponent = edgesTypesMap.straight;
  const { xFrom, yFrom, xTo, yTo } = newEdge || {};

  const p1 = { x: xFrom, y: yFrom };
  const p2 = { x: xTo || xFrom, y: yTo || yFrom };

  return (
    <svg className="work-flow-edges work-flow-container" width="100%" height="100%">
      <g className={`work-flow-edge new-edge dashed`}>
        <EdgeComponent p1={p1} p2={p2} />
      </g>
    </svg>
  );
}

export default NewEdge;
