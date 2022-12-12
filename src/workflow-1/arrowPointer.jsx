import React from 'react';

function ArrowPointer({ p1, p2, headLength = 10 ,...rest}) {
  const PI = Math.PI;
  const degreesInRadians225 = (225 * PI) / 180;
  const degreesInRadians135 = (135 * PI) / 180;

  // calc the angle of the line
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;
  const angle = Math.atan2(dy, dx);

  // calc arrowhead points
  const x225 = p2.x + headLength * Math.cos(angle + degreesInRadians225);
  const y225 = p2.y + headLength * Math.sin(angle + degreesInRadians225);
  const x135 = p2.x + headLength * Math.cos(angle + degreesInRadians135);
  const y135 = p2.y + headLength * Math.sin(angle + degreesInRadians135);

  return (
    <g {...rest}>
      <path
        className="work-flow-edge-path"
        d={`M ${p1.x} ${p1.y} L ${p2.x} ${p2.y} M ${p2.x} ${p2.y} L ${x225} ${y225} M ${p2.x} ${p2.y} L ${x135} ${y135}`}
      />
      <path
        className="work-flow-edge-interaction"
        d={`M ${p1.x} ${p1.y} L ${p2.x} ${p2.y} M ${p2.x} ${p2.y} L ${x225} ${y225} M ${p2.x} ${p2.y} L ${x135} ${y135}`}
      />
    </g>
  );
}

export default ArrowPointer;
