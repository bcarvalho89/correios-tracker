import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import axios from 'axios';
import { Accordion, AccordionItem } from 'react-sanfona';

import { validateSRO } from '../helpers/utils';
import Event from './event';

const API = 'https://jaiminho-api.herokuapp.com';

export default class Track extends Component {
  constructor(props) {
    super(props);

    const requestedObjects = props.match.params.objects;

    this.state = {
      trackingList: [],
      errors: [],
      isFething: true
    }

    this.requestTracking(requestedObjects);
  }

  requestTracking(objects) {
    let invalidObjects = [];
    objects = objects.split(';');

    let validObjects = objects.filter((object) => {
      if (!validateSRO(object)) {
        let error = {
          trackingCode: object,
          message: 'Objeto inválido'
        };

        invalidObjects.push(error);
        return false;
      }

      return true;
    });

    axios.post(`${API}/track`, {
      objects: validObjects
    })
    .then((resp) => {
      this.setState({...this.state, trackingList: resp.data, isFething: false, errors: invalidObjects})
    });
  }

  render() {
    const renderEvents = (events) => {
      return events.map((event, index) => (
        <Event key={index} data={event} />
      ))
    };

    const renderRows = () => {
      return (
        <Accordion className="collapse">
          {this.state.trackingList.map((object, index) => (
            <AccordionItem key={index} title={object.trackingCode} className="collapse__section" titleClassName="collapse__section-header" expandedClassName="is-open" expanded={index === 0}>
              {renderEvents(object.events)}
            </AccordionItem>
          ))}
        </Accordion>
      );
    };

    const renderError = () => {
      let error = this.state.errors.map((error, index) => (
        <p key={index}><strong>{error.trackingCode}</strong> - {error.message}</p>
      ));

      let errorPlural = this.state.errors.length === 1 ? 'erro' : 'erros';

      return (
        <div className="error">
          <h3 className="error__title">Encontramos {this.state.errors.length} {errorPlural}:</h3>
          {error}
        </div>
      )
    };

    return (
      <div>
        <div className={this.state.isFething ? 'loader is-active' : 'loader'}></div>

        {
          this.state.errors.length > 0 &&
            renderError()
        }

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
