import React from 'react';
import DotBackground from './DotBackground';
import './style.css';

const backgroundTypes = {
  dotted: DotBackground,
};

function Background({ type }) {
  const Component = backgroundTypes[type];
  return <Component />;
}

export default Background;
