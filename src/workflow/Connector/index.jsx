import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import useWorkFlowStore from '../store';
import './style.css';

function Connector(props) {
  const { type, position, nodeId, style, onConnect, isValidConnection } = props;
  const { connectorsMap, setConnectorsMap, setNewEdge, newEdge } = useWorkFlowStore(store => store);

  useEffect(() => {
    const connectorData = { position, style, onConnect, isValidConnection };
    if (!connectorsMap.size || !connectorsMap.has(nodeId)) {
      connectorsMap.set(nodeId, new Map([[type, connectorData]]));
    } else if (connectorsMap.has(nodeId)) {
      const typeMap = connectorsMap.get(nodeId);
      if (!typeMap.has(type)) {
        connectorsMap.get(nodeId).set(type, connectorData);
      }
    }
    setConnectorsMap(connectorsMap);
  }, []);

  const handleStartConnection = evt => {
    evt.stopPropagation();
    const { pageX, pageY } = evt;
    const { nodeid, type } = { ...evt.target.dataset };
    setNewEdge({ [type]: nodeid, xFrom: pageX, yFrom: pageY });
  };

  const handleEndConnection = async evt => {
    evt.stopPropagation();
    const { nodeid, type } = evt.target.dataset;
    const edge = { ...newEdge, [type]: nodeid };
    const { source, target } = edge;
    const id = `${source}-edge-${target}`;

    if (source && target && source !== target) {
      const sourceValue = connectorsMap.get(source).get('source');
      const isValid = await sourceValue.isValidConnection({ source, target, id });
      if (isValid) {
        sourceValue.onConnect?.({ source, target, id });
        setNewEdge({ source, target, id });
      } else {
        setNewEdge(null);
      }
    } else {
      setNewEdge(null);
    }
  };

  return (
    <div
      className={`connector ${position}`}
      data-nodeid={nodeId}
      data-type={type}
      style={style}
      onMouseDown={handleStartConnection}
      onMouseUp={handleEndConnection}
    ></div>
  );
}

Connector.propTypes = {
  type: PropTypes.oneOf(['source', 'target']).isRequired,
  nodeId: PropTypes.string.isRequired,
  position: PropTypes.oneOf(['top', 'left', 'right', 'bottom']).isRequired,
  style: PropTypes.object,
  onConnect: PropTypes.func,
  isValidConnection: PropTypes.func,
};

Connector.defaultProps = {
  isValidConnection: () => true,
};

export default memo(Connector);
