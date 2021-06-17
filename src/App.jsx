import React, { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';

import './App.css';
import StackedBarChart from './components/common/charts/StackedBarChart';
import config from './config';

const App = (props) => {
  const handleOnClick = (e) => {
    console.log(e.target);
  };

  const options = {};

  const data = {
    title: 'JUMP score',
    datasets: [
      {
        label: '1',
        backgroundColor: 'rgba(235, 29, 29, 0.7)',
        value: 300,
      },
      {
        label: '2',
        backgroundColor: 'rgba(79, 143, 15, 0.7)',
        value: 40,
      },
      {
        label: '3',
        backgroundColor: 'rgba(16, 94, 172, 0.7)',
        value: 20,
      },
      {
        label: '4',
        backgroundColor: 'rgba(247, 127, 7, 0.7)',
        value: 5,
      },
      {
        label: 'NA',
        backgroundColor: '#efefef',
        value: 5,
      },
    ],
  };

  return (
    <div className="App">
      <div className="app-version">App Version: {config.appVersion}</div>
      <div className="App-header">
        <StackedBarChart
          height="100"
          width="100"
          id="stackedBarChart"
          options={options}
          data={data}
          onClick={handleOnClick}
        />
      </div>
    </div>
  );
};

export default App;
