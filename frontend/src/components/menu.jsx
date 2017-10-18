import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export default class Menu extends Component {
  render() {
    return (
      <ul>
        <li><NavLink exact to="/" activeClassName="active">Rastrear</NavLink></li>
        <li><NavLink exact to="/sobre" activeClassName="active">Sobre</NavLink></li>
      </ul>
    )
  }
}
