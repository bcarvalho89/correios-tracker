import React from 'react';
import ReactDOM from 'react-dom';
import App from './main/app';

import { HashRouter as Router } from 'react-router-dom'

require('./style/app.scss');

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('app')
);
