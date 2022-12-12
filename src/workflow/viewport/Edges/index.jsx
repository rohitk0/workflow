import React from 'react';
import classnames from 'classnames';
import useWorkFlowStore from '../../store';
import edgesTypesMap from './edgeTypes/edgeTypesMap';
import { getCordinates } from '../helper';
import './style.css';

function Edges() {
  const { edges, nodesMap, connectorsMap, setSelectedNodeEdge, selectedNodeEdge } =
    useWorkFlowStore(store => store);

  return (
    <svg className="work-flow-edges work-flow-container" width="100%" height="100%">
      {edges.map(({ id, source, target, type="straight", variant }) => {
        const coordinates = getCordinates(nodesMap, connectorsMap, source, target);
        if (!coordinates) return null;

        const EdgeComponent = edgesTypesMap[type];
        return (
          <g
            key={id}
            className={`work-flow-edge ${variant} ${classnames({
              'selected-edge': selectedNodeEdge?.edge === id,
            })}`}
            role={'button'}
            onClick={() => setSelectedNodeEdge({ edge: id })}
          >
            <EdgeComponent p1={coordinates.p1} p2={coordinates.p2} />
          </g>
        );
      })}
    </svg>
  );
}

export default Edges;
