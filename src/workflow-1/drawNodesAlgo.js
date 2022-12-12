 const drawNodes = (nodes) => {
    const nodesArr = [];

  const drawEach = (node, level, path) => {
    const newNode = {...node,zIndex:level*5,path};
    if(newNode.children) delete newNode.children
    nodesArr.push({...newNode})
    node.children?.forEach((each, ind) => {
      drawEach(each, level + 1, `${path}.children.${ind}`);
    });
  };

  nodes.forEach((node, ind) => drawEach(node, 1, `${ind}`));
  return nodesArr;
};

export default drawNodes;
