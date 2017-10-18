import React, { Component } from 'react';
import axios from 'axios';

import ObjectList from './objectList';

const API = 'http://localhost:3003/api/todos';

export default class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
    }
  }

  render() {
    return (
      <div>
        <h1>Home</h1>
        <ObjectList />
      </div>
    )
  }
}
