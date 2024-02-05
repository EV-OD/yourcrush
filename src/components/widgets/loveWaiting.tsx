import React from "react";

function LoveWaiting() {
  return (
    <div>
      <svg
        className="heart-loader"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 90 90"
        version="1.1"
      >
        <g className="heart-loader__group">
          <path
            className="heart-loader__square"
            strokeWidth="1"
            fill="none"
            d="M0,30 0,90 60,90 60,30z"
          />
          <path
            className="heart-loader__circle m--left"
            strokeWidth="1"
            fill="none"
            d="M60,60 a30,30 0 0,1 -60,0 a30,30 0 0,1 60,0"
          />
          <path
            className="heart-loader__circle m--right"
            strokeWidth="1"
            fill="none"
            d="M60,60 a30,30 0 0,1 -60,0 a30,30 0 0,1 60,0"
          />
          <path
            className="heart-loader__heartPath"
            strokeWidth="2"
            d="M60,30 a30,30 0 0,1 0,60 L0,90 0,30 a30,30 0 0,1 60,0"
          />
        </g>
      </svg>
    </div>
  );
}

export default LoveWaiting;
