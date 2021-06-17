import React, { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';

import './App.css';
import StackedBarChart from './components/common/charts/StackedBarChart';
import config from './config';

const App = (props) => {
  const handleOnClick = (e) => {
    console.log(e.target);
  };

  return (
    <div className="App">
      <div className="app-version">App Version: {config.appVersion}</div>
      <div className="App-header">
        <StackedBarChart
          height="100"
          width="100"
          id="stackedBarChart"
          onClick={handleOnClick}
        />
      </div>
    </div>
  );
};

export default App;
