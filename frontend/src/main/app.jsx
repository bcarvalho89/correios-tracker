//import '../template/custom.css';

import React from 'react';
import Routes from './routes';
import Header from '../components/header';
import Footer from '../components/footer';

export default props => (
  <div>
    <Header />
    <div className="container">
      <main>
        <Routes />
      </main>
    </div>
    <Footer />
  </div>
)
