import React from 'react';

import sty from './ProgressBar.module.css';

const ProgressBar = ({ percentage }) => {
  return (
    <div className={sty.bar}>
      <p>0%</p>
      <div className={sty.barHolder}>
        <div
          className={sty.barLen}
          style={{
            width: percentage,
          }}
        ></div>
      </div>
      <p>100%</p>
    </div>
  );
};

export default ProgressBar;
