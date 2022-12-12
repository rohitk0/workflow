const getCordinates = (nodesMap, connectorsMap, source, target) => {
  const sourceNode = nodesMap.get(source);
  const targetNode = nodesMap.get(target);

  const sourceNodeConnection = connectorsMap.get(source)?.get('source');
  const targetNodeConnection = connectorsMap.get(target)?.get('target');

  if (
    !sourceNode?.position ||
    !targetNode?.position ||
    !sourceNodeConnection ||
    !targetNodeConnection
  )
    return null;

  return {
    p1: getPos({ ...sourceNode, connection: sourceNodeConnection }),
    p2: getPos({ ...targetNode, connection: targetNodeConnection }),
  };
};

const getPos = ({ position: { x, y }, height, width, connection }) => {
  const { position, style: { left = 0, top = 0 } = {} } = connection;

  return {
    top: {
      x: x + (left || width / 2),
      y: y + top,
    },
    left: {
      x: x + left || 0,
      y: y + (top || height / 2),
    },
    bottom: {
      x: x + (left || width / 2),
      y: y + height + top,
    },
    right: {
      x: x + width + left,
      y: y + (top || height / 2),
    },
  }[position];
};

export { getCordinates };
