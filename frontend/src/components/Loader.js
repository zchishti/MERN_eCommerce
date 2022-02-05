import React from 'react';
import { Spinner } from 'react-bootstrap';


const Loader = () => {
  return <Spinner animation='border' role='status' style={{
      width: '6.25rem',
      height: '6.25rem',
      margin: 'auto',
      display: 'block'
  }}>
      <span className='sr-only'>Loading...</span>
  </Spinner>
};

export default Loader;
