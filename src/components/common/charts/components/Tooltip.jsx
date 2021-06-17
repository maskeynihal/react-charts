import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

const Tooltip = (props) => {
  const { position, data } = props;

  useEffect(() => {
    console.log(data);

    return () => console.log('removed');
  }, []);

  return createPortal(
    <div
      id="barchart"
      style={{
        left: position.x + 'px',
        top: position.y + 'px',
        position: 'absolute',
      }}
    >
      {data &&
        data.map(({ label, value }) => (
          <ul>
            <li>Label: {label}</li>
            <li>Value: {value}</li>
          </ul>
        ))}
    </div>,
    document.body
  );
};

export default Tooltip;
