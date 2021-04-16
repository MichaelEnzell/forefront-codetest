import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Movies from './components/Movies';
import App from './App';
import 'semantic-ui-css/semantic.min.css';

ReactDOM.render(
  <React.StrictMode>
    <App />
    <Movies />
  </React.StrictMode>,
  document.getElementById('root')
);


