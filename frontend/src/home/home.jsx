import React, { Component } from 'react';
import {withRouter} from "react-router-dom";

class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      objectsToTrack: [],
      searchOnFocus: false
    }

    this.doSearch = this.doSearch.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
  }

  doSearch(e) {
    e.preventDefault();
    this.props.history.push(`track/${this.state.objectsToTrack}`);
  }

  handleChange(e) {
    this.setState({objectsToTrack: e.target.value});
  }

  onFocus() {
    this.setState({searchOnFocus: true});
  }

  onBlur() {
    this.setState({searchOnFocus: false});
  }

  render() {
    let formSearchClasses = this.state.searchOnFocus ? 'search-box__form on-focus' : 'search-box__form';

    return (
      <div className="search-box">
        <form onSubmit={this.doSearch} className={formSearchClasses}>
          <input type="text" placeholder="Digite o número de rastreamento (DV783051713BR)" className="input search-box__form-input" onChange={this.handleChange} onFocus={this.onFocus} onBlur={this.onBlur} />
          <button type="submit" className="button search-box__form-action"><i className="material-icons">search</i></button>
        </form>
        <p className="search-box__tip"><strong>Dica: </strong>Rastreie vários objetos separando-os por <code>;</code></p>
      </div>
    )
  }
}

export default withRouter(Home);
