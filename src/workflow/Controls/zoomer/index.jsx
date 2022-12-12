import React from 'react';
import useWorkFlowStore from '../../store';
import './style.css';

function Zoomer() {
  const { currentZoom, maxZoom, minZoom, setZoom } = useWorkFlowStore(store => store);
  const step = 0.01 * maxZoom;

  const handleDecreament = () => {
    const newZoom = +(currentZoom - step).toFixed(2);
    if (newZoom < minZoom) return;
    setZoom(newZoom);
  };

  const handleIncreament = () => {
    const newZoom = +(currentZoom + step).toFixed(2);
    if (maxZoom < newZoom) return;
    setZoom(newZoom);
  };

  return (
    <div className="zoomer">
      <button className="btn" onClick={handleDecreament}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 14 2"
          fill="none"
        >
          <path d="M14 2H0V0H14V2Z" fill="#1976D2" />
        </svg>
      </button>
      <div className="zoom-percent">{Math.floor((currentZoom * 100) / maxZoom)}%</div>
      <button className="btn" onClick={handleIncreament}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
        >
          <path d="M14 8H8V14H6V8H0V6H6V0H8V6H14V8Z" fill="#1976D2" />
        </svg>
      </button>
    </div>
  );
}

export default Zoomer;
