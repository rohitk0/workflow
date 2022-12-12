import React, { useEffect, useRef, useState } from 'react';
import { Slider, Stack } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ArrowPointer from './arrowPointer';
// import drawNodes from './drawNodesAlgo';
import defaultNodes from './nodes';
// import drawArrow from './drawArrowAlgo';
import { getArrowCoordinates, getFromPath, setOnPath } from './helper';
import WorkFlowBackground from './workFlowBackground';
import { initialNodes, initialEdges } from './graphVertexAndEdge';
import Graph from './Graph';
import NewEdge from './newEdge';
import './style.css';

function Workflow() {
  const workFlowRef = useRef();
  const workFlowNodes = useRef();

  const [zoom, setZoom] = useState(1);
  const [selectedNode, setSelectedNode] = useState(null);
  const [viewPortPos, setViewPortPos] = useState({ x: 0, y: 0, readyToDrag: false });
  const [workFlowRect, setWorkFlowRect] = useState({});
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [selectedArrowId, setSelectedArrowId] = useState(null);
  const [newEdge, setNewEdge] = useState(null);

  const workflowGraph = new Graph(nodes, edges);

  useEffect(() => {
    setWorkFlowRect(workFlowRef.current.getBoundingClientRect());
  }, []);

  const handleZoomChange = ({ target: { value } }) => {
    setZoom((1 / 50) * value);
  };

  const handleMouseDownOnShape = evt => {
    evt.stopPropagation();
    const { clientX, clientY, target } = evt;
    const { nodeid } = { ...target.dataset };

    const clickedNode = workflowGraph.getNodesMap().get(nodeid);

    setSelectedNode({
      nodeid: nodeid,
      clickedClientX: clientX,
      clickedClientY: clientY,
      nodeX: clickedNode.x,
      nodeY: clickedNode.y,
      readyToDrag: true,
    });
  };

  const handleArrowClick = (evt, id) => {
    evt.stopPropagation();
    setSelectedArrowId(id);
  };

  const handleMouseDownOnRenderer = evt => {
    evt.stopPropagation();
    const { clientX, clientY } = evt;

    console.log(evt);

    setViewPortPos(prev => ({
      ...prev,
      lastClientX: clientX,
      lastClientY: clientY,
      readyToDrag: true,
    }));
  };

  const moveNode = evt => {
    const { clientX, clientY } = evt;
    const { nodeid, clickedClientX, clickedClientY, nodeX, nodeY } = selectedNode;

    setNodes(prev => {
      const clickedNode = workflowGraph.getNodesMap().get(nodeid);

      const data = setOnPath(prev, `${clickedNode.index}`, {
        ...prev[clickedNode.index],
        x: nodeX + (clientX - clickedClientX) / zoom,
        y: nodeY + (clientY - clickedClientY) / zoom,
      });

      return data;
    });
  };

  const moveViewPort = evt => {
    const { clientX, clientY } = evt;
    const { lastClientX, lastClientY } = viewPortPos;

    setViewPortPos(prev => ({
      ...prev,
      x: prev.x + (clientX - lastClientX) / zoom,
      y: prev.y + (clientY - lastClientY) / zoom,
      lastClientX: clientX,
      lastClientY: clientY,
    }));
  };

  const moveEdgePencil = evt => {
    evt.stopPropagation();
    const { clientX, clientY } = evt;

    setNewEdge(prev => ({
      ...prev,
      xTo: clientX,
      yTo: clientY,
    }));
  };

  const handleMouseMove = evt => {
    if (selectedNode) {
      moveNode(evt);
    } else if (viewPortPos?.readyToDrag) {
      moveViewPort(evt);
    } else if (newEdge) {
      moveEdgePencil(evt);
    }
  };

  const handleMouseDownOnEdgeConnector = evt => {
    evt.stopPropagation();
    const { clientX, clientY } = evt;
    const { nodeid, type } = { ...evt.target.dataset };
    const typesKey = { source: 'sourceId', target: 'targetId' };

    setNewEdge(prev => ({
      ...prev,
      [typesKey[type]]: nodeid,
      xFrom: clientX,
      yFrom: clientY,
    }));
  };

  const handleMouseUpOnEdgeConnector = evt => {
    evt.stopPropagation();
    const { nodeid, type } = { ...evt.target.dataset };
    const typesKey = { source: 'sourceId', target: 'targetId' };
    const { sourceId, targetId } = newEdge;
    const edge = { sourceId, targetId, [typesKey[type]]: nodeid };

    if (edge.sourceId && edge.targetId) {
      setEdges(prev => [...prev, edge]);
    }
    setNewEdge(null);
  };

  const handleMouseUp = evt => {
    setSelectedNode(null);
    setViewPortPos(prev => ({ ...prev, readyToDrag: false }));
    setNewEdge(null);
  };

  const handleMouseOut = evt => {
    // console.log('running out',evt);
    // setSelectedNode(null);
  };

  return (
    <div className="container">
      <div
        className="work-flow-renderer grabbable"
        ref={workFlowRef}
        onMouseMove={handleMouseMove}
        onMouseOut={handleMouseOut}
        onMouseUp={handleMouseUp}
        onMouseDown={handleMouseDownOnRenderer}
      >
        <div
          className="work-flow-viewport work-flow-container"
          style={{
            transform: `translate(${viewPortPos.x * zoom}px,${
              viewPortPos.y * zoom
            }px) scale(${zoom})`,
          }}
        >
          <svg className="work-flow-edges work-flow-container" width="100%" height="100%">
            {workflowGraph.getEdges().map(({ from, to, id }) => {
              const { p1, p2 } = getArrowCoordinates(from, to);
              return (
                <ArrowPointer
                  key={id}
                  className={`work-flow-edge ${id === selectedArrowId ? 'selected' : ''}`}
                  role="button"
                  onClick={evt => handleArrowClick(evt, id)}
                  p1={p1}
                  p2={p2}
                />
              );
            })}
          </svg>
          <div className="work-flow-edges_labels">
            {workflowGraph.getEdges().map(({ from, to, id }) => {
              const { p1, p2 } = getArrowCoordinates(from, to);
              return (
                <div
                  className="work-flow-edge_label"
                  style={{
                    transform: `translate(-50%, -50%) translate(${p1.x + (p2.x - p1.x) / 2}px,${
                      p1.y + (p2.y - p1.y) / 2
                    }px)`,
                  }}
                >
                  Label
                </div>
              );
            })}
          </div>
          <div className="work-flow-nodes" ref={workFlowNodes}>
            {Array.from(workflowGraph.getNodesMap()).map(([_, node]) => {
              return (
                <div
                  className="work-flow-node grabbable"
                  key={`${node.x}-${node.y}`}
                  style={{
                    transform: `translate(${node.x}px,${node.y}px)`,
                    width: `${node.width}px`,
                    height: `${node.height}px`,
                  }}
                  data-nodeid={node.id}
                  onMouseDown={handleMouseDownOnShape}
                >
                  <span>{node.data.text}</span>

                  <div
                    className="connector left"
                    data-nodeid={node.id}
                    data-type="target"
                    onMouseDown={handleMouseDownOnEdgeConnector}
                    onMouseUp={handleMouseUpOnEdgeConnector}
                  ></div>
                  <div
                    className="connector right"
                    data-nodeid={node.id}
                    data-type="source"
                    onMouseDown={handleMouseDownOnEdgeConnector}
                    onMouseUp={handleMouseUpOnEdgeConnector}
                  ></div>
                </div>
              );
            })}
          </div>
        </div>
        {newEdge && <NewEdge newEdge={newEdge} />}
      </div>
      <WorkFlowBackground />

      <Stack className="workflow-zoomer" spacing={2} direction="row" alignItems="center">
        <RemoveIcon />
        <Slider min={25} max={75} value={50 * zoom} onChange={handleZoomChange} />
        <AddIcon />
      </Stack>
    </div>
  );
}

export default Workflow;
