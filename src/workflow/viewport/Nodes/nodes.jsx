import React from 'react';
import useWorkFlowStore from '../../store';
import './style.css';

function Nodes({ nodeTypesMapping }) {
  const { nodesMap, setToDragNode, freezeNodes, setSelectedNodeEdge, selectedNodeEdge } =
    useWorkFlowStore(store => store);

  const handleMouseDown = (evt, node) => {
    evt.stopPropagation();
    setSelectedNodeEdge({ node: node.id });
    if (node.freezed || freezeNodes) return;

    const { clientX, clientY } = evt;

    setToDragNode({
      id: node.id,
      clickedClientX: clientX,
      clickedClientY: clientY,
      initialX: node.position.x,
      initialY: node.position.y,
    });
  };

  return (
    <div className="work-flow-nodes">
      {Array.from(nodesMap).map(([_, node]) => {
        const Component = nodeTypesMapping[node.type];
        return (
          <div
            className="work-flow-node grabbable"
            key={node.id}
            style={{
              transform: `translate(${node.position.x}px,${node.position.y}px)`,
              width: `${node.width}px`,
              height: `${node.height}px`,
            }}
            data-nodeid={node.id}
            onMouseDown={evt => handleMouseDown(evt, node)}
          >
            <Component {...node} selected={selectedNodeEdge?.node === node.id} />
          </div>
        );
      })}
    </div>
  );
}

export default Nodes;
