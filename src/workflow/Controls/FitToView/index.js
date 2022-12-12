import React from 'react';
import useWorkFlowStore from '../../store';

function FitToView() {
  const { nodesMap, containerDimension, setViewPortPos, setZoom } = useWorkFlowStore(
    store => store,
  );

  const handleClick = () => {
    const nodesPositions = Array.from(nodesMap).map(([_, node]) => node);

    let maxXNodeId, maxYNodeId;
    let minX = Infinity,
      minY = Infinity,
      maxX = -Infinity,
      maxY = -Infinity;

    nodesPositions.forEach(node => {
      const x = node.position.x;
      const y = node.position.y;

      if (x < minX) {
        minX = x;
      }

      if (maxX < x) {
        maxX = x;
        maxXNodeId = node.id;
      }

      if (y < minY) {
        minY = y;
      }

      if (maxY < y) {
        maxY = y;
        maxYNodeId = node.id;
      }
    });

    const extremeRightX = maxX + nodesMap.get(maxXNodeId).width;
    const extremeBottomY = maxY + nodesMap.get(maxYNodeId).height;

    const { x, y, width, height } = containerDimension;

    const extremeTopDiff = y - minY > 0 ? y - minY : 0;
    const extremeBottomDiff = extremeBottomY - (y + height) > 0 ? extremeBottomY - (y + height) : 0;

    const extremeLeftDiff = x - minX > 0 ? x - minX : 0;
    const extremeRightDiff = extremeRightX - (x + width) > 0 ? extremeRightX - (x + width) : 0;

    const maxXDiff = Math.max(extremeLeftDiff, extremeRightDiff);
    const maxYDiff = Math.max(extremeTopDiff, extremeBottomDiff);

    const virtualHeight = height + 2 * maxYDiff;
    const virtualWidth = width + 2 * maxXDiff;

    const minRequiredZoom = Math.min(height / virtualHeight, width / virtualWidth);

    toggleViewPortTransition();
    setViewPortPos({ x: 0, y: 0 });
    setZoom(minRequiredZoom);
    setTimeout(toggleViewPortTransition,1000)
  };

  const toggleViewPortTransition = () => {
    document.getElementById('workflow-viewport').classList.toggle('viewport-transition');
  };

  return (
    <button className="btn" onClick={handleClick}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="20"
        viewBox="0 0 16 20"
        fill="none"
      >
        <path
          d="M0 18H16V20H0V18ZM0 0H16V2H0V0ZM9 7H12L8 3L4 7H7V13H4L8 17L12 13H9V7Z"
          fill="#1976D2"
        />
      </svg>
    </button>
  );
}

export default FitToView;
