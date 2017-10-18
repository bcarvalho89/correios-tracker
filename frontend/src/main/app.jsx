//import '../template/custom.css';

import React from 'react';
import Routes from './routes';
import Menu from '../components/menu';

export default props => (
  <div>
    <Menu />
    <div className="container">
      <Routes />
    </div>
  </div>
)
