/* Rotas */
import React from 'react';

import { Switch, Route, Redirect } from 'react-router-dom';

import Home from '../home/home';
import About from '../about/about';
import Track from '../track/track';

export default props => (
  <Switch>
    <Route exact path='/' component={Home}/>
    <Route exact path='/track/:objects' component={Track}/>
    <Route path='/sobre' component={About}/>
    <Redirect path='*' to='/' />
  </Switch>
);
