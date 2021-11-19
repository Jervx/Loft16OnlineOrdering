import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Windmill } from '@windmill/react-ui'
import loft16Theme from './Theme/loft16Theme';

ReactDOM.render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>,
  // document.getElementById('root')
  <Windmill theme={loft16Theme}>
    <App />
  </Windmill>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();