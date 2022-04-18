import React from 'react';

import sty from './Spinner.module.css';

const Spinner = () => {
  return (
    <div className={sty.spinner}>
      <div className={sty.loading}></div>
    </div>
  );
};

export default Spinner;
