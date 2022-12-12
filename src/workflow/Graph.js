class Graph {
  #nodes = [];
  #edges = [];
  #nodesMap = []

  constructor(initialNodes, initialEdges) {
    this.#nodes = initialNodes;
    this.#edges = initialEdges;
    this.#nodesMap = this.getNodesMap();
  }

  getNodesMap() {
    return this.#nodes.reduce((prev, curr, index) => {
      prev.set(curr.id, { ...curr, index });
      return prev;
    }, new Map());
  }

  getEdgesAdjacencyList() {
    return this.#edges.reduce((prev, curr) => {
      const value = { id: `${curr.sourceId}-edge-${curr.targetId}`, ...curr };
      if (prev.has(curr.sourceId)) {
        prev.get(curr.sourceId).set(curr.targetId, value);
      } else {
        const respectiveEdgesMap = new Map();
        respectiveEdgesMap.set(curr.targetId, value);
        prev.set(curr.sourceId, respectiveEdgesMap);
      }
      return prev;
    }, new Map());
  }



  getEdgesList() {
    const visitedNodes = new Set();
    const toVisitNodes = [];
    const edges = [];

    const nodesAdjacencyList = this.getNodesAdjacencyList();
    const nodesMap = this.getNodesMap();

    this.#nodes.forEach(eachNode => {
      if (!visitedNodes.has(eachNode.id)) {
        toVisitNodes.push(eachNode.id);

        while (toVisitNodes.length) {
          const fromId = toVisitNodes.shift();

          if (!visitedNodes.has(fromId) && nodesAdjacencyList.has(fromId)) {
            const edgesMap = nodesAdjacencyList.get(fromId);

            edgesMap.forEach((value, toId) => {
              edges.push({
                from: nodesMap.get(fromId),
                to: value.node,
                id: `${fromId}-edge-${toId}`,
                ...value.edge,
              });

              if (nodesAdjacencyList.has(toId)) {
                toVisitNodes.push(toId);
              }
            });

            visitedNodes.add(fromId);
          }
        }
      }
    });

    return edges;
  }
}

export default Graph;
