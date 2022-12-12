import React from 'react';
import useWorkFlowStore from '../../store';
import { getCordinates } from '../helper';
import './style.css';

function Labels() {
  const { edges, nodesMap, connectorsMap } = useWorkFlowStore(store => store);

  return (
    <div className="work-flow-edges_labels">
      {edges.map(({ source, target, label, labelProps }) => {
        const coordinates = getCordinates(nodesMap, connectorsMap, source, target);
        const { style, className, ...restProps } = labelProps || {};
        if (!coordinates) return null;

        const { p1, p2 } = coordinates;
        const tx = p1.x + (p2.x - p1.x) / 2;
        const ty = p1.y + (p2.y - p1.y) / 2;

        return (
          <div
            key={`${source}-${target}`}
            {...restProps}
            className={`work-flow-edge_label ${className}`}
            style={{
              ...style,
              transform: `translate(-50%, -50%) translate(${tx}px,${ty}px)`,
            }}
          >
            {label}
          </div>
        );
      })}
    </div>
  );
}

export default Labels;
