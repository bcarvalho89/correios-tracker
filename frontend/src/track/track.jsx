import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import ObjectList from './objectList';
import Collapse from '../components/collapse';

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
    /*let _self = this;

    setTimeout(function() {
      _self.setState({...this.state, isFething: false})
    }, 2000);*/
    axios.get(`${API}${objects}`)
      .then((resp) => {
        this.setState({...this.state, trackingList: resp.data, isFething: false})
      });
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
      console.log(this.state.trackingList);

      return this.state.trackingList.map((object, index) => (
        <Collapse key={index}></Collapse>
        /*<div >
          <hr/>
          <h2>{object.trackingCode}</h2>
          {renderEvents(object.events)}
        </div>*/
      ))
    };


    return (
      <div>
        <div className={this.state.isFething ? 'loader is-active' : 'loader'}></div>

        {!this.state.isFething &&
          renderRows()
        }
        {!this.state.isFething &&
          <div className="action">
            <Link to='/' className="button button--default">Voltar</Link>
          </div>
        }
      </div>

    )
  }
}
