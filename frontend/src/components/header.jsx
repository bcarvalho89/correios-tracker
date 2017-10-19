import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Menu from './menu';

export default class Header extends Component {
  render() {
    return (
      <header className='header'>
        <Menu />
        <div className='header__logo'>
          <h1><Link to="/">(LOGO)</Link></h1>
        </div>
      </header>
    )
  }
}
