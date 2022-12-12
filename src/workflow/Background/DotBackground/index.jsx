import React from 'react';

function DotBackground() {
  return (
    <svg className="work-flow-background">
      <g>
        <defs>
          <pattern id="myPattern" x="1" y="1" width={20} height={20} patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" style={{ stroke: 'none', fill: '#A9A9A9' }} />
          </pattern>
        </defs>
        <rect x="0" y="0" width="100%" height="100%" fill="url(#myPattern)" />
      </g>
    </svg>
  );
}

export default DotBackground;
