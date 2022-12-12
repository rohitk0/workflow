import create from 'zustand';

const initialState = {
  nodesMap: new Map(),
  connectorsMap: new Map(),
  edges: [],
  currentZoom: 1,
  maxZoom: 2,
  minZoom: 0.5,
  viewPortPos: { x: 0, y: 0 },
  toDragNode: null,
  containerDimension: null,
  newEdge: null,
  freezeNodes: false,
  selectedNodeEdge: null,
  selectedEdge: null,
};

const useWorkFlowStore = create(set => ({
  ...initialState,
  setNodesMap: nodesMap => set(() => ({ nodesMap })),
  setEdges: edges => set(() => ({ edges })),
  setConnectorsMap: connectorsMap => set(() => ({ connectorsMap })),
  setToDragNode: toDragNode => set(() => ({ toDragNode })),
  setViewPortPos: viewPortPos => set(() => ({ viewPortPos })),
  setZoom: currentZoom => set(() => ({ currentZoom })),
  setContainerDimension: containerDimension => set(() => ({ containerDimension })),
  setNewEdge: newEdge => set(() => ({ newEdge })),
  setFreezeNodes: freezeNodes => set(() => ({ freezeNodes })),
  setSelectedNodeEdge: selectedNodeEdge => set(() => ({ selectedNodeEdge })),
}));

export default useWorkFlowStore;
