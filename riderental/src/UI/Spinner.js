import React from 'react';
import './Spinner.css'; // Import the CSS file for spinner styles

export const Spinner = () => {
  return (
    <div className='spinner-container'>
      <div className='loader'></div>
      <div className='spinner-message'>
        <h2>Wait...</h2>
      </div>
    </div>
  );
};
