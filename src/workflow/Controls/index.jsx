import React from 'react';
import FitToView from './FitToView';
import Zoomer from './zoomer';
import './style.css';


function Controls() {
  return (
    <div className="work-flow-controls">
      <FitToView />
      <Zoomer />
    </div>
  );
}

export default Controls;
