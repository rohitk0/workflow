import React from 'react';
import ArrowPointer from './arrowPointer';

function NewEdge({  newEdge }) {
  const { xFrom, yFrom, xTo, yTo } = newEdge || {  };

  const p1 = { x:xFrom, y:yFrom };
  const p2 = { x:xTo, y:yTo };

  return (
    <svg className="work-flow-edges work-flow-container">
      <ArrowPointer className={`work-flow-edge selected`} p1={p1} p2={p2} />
    </svg>
  );
}

export default NewEdge;
