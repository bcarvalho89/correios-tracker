import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import ObjectList from './objectList';

const API = 'http://localhost:3000/';

export default class Track extends Component {
  constructor(props) {
    super(props);

    const requestedObjects = props.match.params.objects;

    this.state = {
      trackingList: [],
      isFething: true
    }

    this.requestTracking(requestedObjects);
  }

  requestTracking(objects) {
    axios.get(`${API}${objects}`)
      .then((resp) => {
        this.setState({...this.state, trackingList: resp.data, isFething: false})
      })
  }

  render() {

    const renderEvents = (events) => {
      return events.map((event, index) => (
        <li key={index}>
          {event.status} -
          {event.date} -
          {event.location}
        </li>
      ))
    };

    const renderRows = () => {

      return this.state.trackingList.map((object, index) => (
        <div key={index}>
          <hr/>
          <h2>{object.trackingCode}</h2>
          {renderEvents(object.events)}
        </div>
      ))
    };


    return (
      <div>
        <h1>Tracking</h1>
        {
          this.state.isFething &&
          `carregando`
        }
        {renderRows()}
        <Link to='/'>Voltar</Link>
      </div>
    )
  }
}
