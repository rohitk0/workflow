import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import useWorkFlowStore from './store';
import Viewport from './viewport/viewport';
import NewEdge from './viewport/Edges/newEdge';
import './style.css';

function WorkFlow(props) {
  const workflowContainerRef = useRef(null);
  const {
    nodes,
    edges,
    onNodeChanges,
    onEdgeChanges,
    nodeTypesMapping,
    distance,
    background,
    onConnect,
  } = props;

  const {
    setNodesMap,
    setEdges,
    toDragNode,
    currentZoom,
    nodesMap,
    setToDragNode,
    viewPortPos,
    setViewPortPos,
    setContainerDimension,
    setNewEdge,
    newEdge,
    freezeNodes,
    setFreezeNodes,
    setSelectedNodeEdge,
    selectedNodeEdge,
  } = useWorkFlowStore();

  const [snapedViewPortPos, setSnapedViewPortPos] = useState(null);

  useEffect(() => {
    const nodesMap = new Map();
    nodes.forEach(node => {
      nodesMap.set(node.id, node);
    });
    setNodesMap(nodesMap);
  }, [nodes]);

  useEffect(() => {
    setEdges(edges);
    setFreezeNodes(props.freezeNodes);
  }, [edges, freezeNodes]);

  useEffect(() => {
    const { source, target } = newEdge || {};
    if (source && target && source !== target) {
      onConnect?.({ ...newEdge });
      setNewEdge(null);
    }
  }, [newEdge]);

  useEffect(() => {
    setContainerDimension(workflowContainerRef.current?.getBoundingClientRect());
  }, []);

  const getNodeChangedPosition = ({ clientX, clientY }) => {
    if (!toDragNode) return { x: clientX, y: clientY };
    const { initialX, initialY, clickedClientX, clickedClientY } = toDragNode;
    const x = initialX + (clientX - clickedClientX) / currentZoom;
    const y = initialY + (clientY - clickedClientY) / currentZoom;
    return { x, y };
  };

  const moveNode = evt => {
    const { clientX, clientY } = evt;
    const newPosition = getNodeChangedPosition({ clientX, clientY });
    const lastPosition = nodesMap.get(toDragNode.id).position;
    const dx = newPosition.x - lastPosition.x;
    const dy = newPosition.y - lastPosition.y;

    const dragDistance = Math.sqrt(dx * dx + dy * dy);
    if (dragDistance < distance) return;

    onNodeChanges?.({
      id: toDragNode.id,
      type: 'position',
      position: newPosition,
    });
  };

  const moveViewPort = evt => {
    const { clientX, clientY } = evt;
    if (freezeNodes) return;

    const { x: initialX, y: initialY, clickedClientX, clickedClientY } = snapedViewPortPos;
    const { x: lastX, y: lastY } = viewPortPos;

    const newX = initialX + (clientX - clickedClientX) / currentZoom;
    const newY = initialY + (clientY - clickedClientY) / currentZoom;

    const dx = newX - lastX;
    const dy = newY - lastY;

    const dragDistance = Math.sqrt(dx * dx + dy * dy);
    if (dragDistance < distance) return;

    setViewPortPos({
      x: newX,
      y: newY,
    });
  };

  const moveNewEdge = evt => {
    const { pageX, pageY } = evt;
    setNewEdge({ ...newEdge, xTo: pageX, yTo: pageY });
  };

  const handleMouseMove = evt => {
    evt.stopPropagation();
    if (toDragNode) {
      moveNode(evt);
    } else if (snapedViewPortPos) {
      moveViewPort(evt);
    } else if (newEdge) {
      moveNewEdge(evt);
    }
  };

  const handleMouseDownOnRenderer = evt => {
    const { clientX, clientY } = evt;
    evt.stopPropagation();
    setSelectedNodeEdge(null);
    setSnapedViewPortPos({ ...viewPortPos, clickedClientX: clientX, clickedClientY: clientY });
  };

  const handleMouseUp = evt => {
    evt.stopPropagation();

    setToDragNode(null);
    setSnapedViewPortPos(null);
    setNewEdge(null);
  };

  const handleKeyDown = evt => {
    const { key } = evt;
    console.log(key);
    if (key === 'Backspace') {
      if (selectedNodeEdge?.node) {
        onNodeChanges?.({
          id: selectedNodeEdge.node,
          type: 'remove',
        });
      } else if (selectedNodeEdge?.edge) {
        onEdgeChanges?.({
          id: selectedNodeEdge.edge,
          type: 'remove',
        });
      }
    }
  };

  return (
    <div className="container" ref={workflowContainerRef} style={{ background }}>
      <div
        tabIndex="0"
        className="work-flow-renderer grabbable"
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseDown={handleMouseDownOnRenderer}
        onKeyDown={handleKeyDown}
      >
        <Viewport nodeTypesMapping={nodeTypesMapping} />
        {newEdge && <NewEdge newEdge={newEdge} />}
      </div>
      {props.children}
    </div>
  );
}

WorkFlow.propTypes = {
  distance: PropTypes.number,
  nodes: PropTypes.array.isRequired,
  edges: PropTypes.array,
  onNodeChanges: PropTypes.func,
  onEdgeChanges: PropTypes.func,
  onConnect: PropTypes.func,
  freezeNodes: PropTypes.bool,
};

WorkFlow.defaultProps = {
  distance: 0,
  edges: [],
  freezeNodes: false,
};

export default WorkFlow;
