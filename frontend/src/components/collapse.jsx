import React, { Component } from 'react';

class Collapse extends Component {
  constructor(props) {
    super(props)

    // Bind class methods
    this.handleTriggerClick = this.handleTriggerClick.bind(this);
    this.handleTransitionEnd = this.handleTransitionEnd.bind(this);
    this.continueOpenCollapsible = this.continueOpenCollapsible.bind(this);

    if (props.open) {
      this.state = {
        isClosed: false,
        height: 'auto',
        hasBeenOpened: true,
      }
    } else {
      this.state = {
        isClosed: true,
        height: 0,
        hasBeenOpened: false,
      }
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.state.shouldOpenOnNextCycle){
      this.continueOpenCollapsible();
    }

    if (prevState.height === 'auto' && this.state.shouldSwitchAutoOnNextCycle === true) {
      window.setTimeout(() => { // Set small timeout to ensure a true re-render
        this.setState({
          height: 0,
          isClosed: true,
          shouldSwitchAutoOnNextCycle: false,
        });
      }, 50);
    }
  }

  closeCollapsible() {
    this.setState({
      shouldSwitchAutoOnNextCycle: true,
      height: this.refs.inner.offsetHeight,
      inTransition: true,
    });
  }

  openCollapsible() {
    this.setState({
      inTransition: true,
      shouldOpenOnNextCycle: true,
    });
  }

  continueOpenCollapsible() {
    this.setState({
      height: this.refs.inner.offsetHeight,
      isClosed: false,
      hasBeenOpened: true,
      inTransition: true,
      shouldOpenOnNextCycle: false,
    });
  }

  handleTriggerClick(event) {
    event.preventDefault();

    if (this.props.triggerDisabled) {
      return
    }

    if (this.props.handleTriggerClick) {
      this.props.handleTriggerClick(this.props.accordionPosition);
    } else {
      if (this.state.isClosed === true) {
        this.openCollapsible();
      } else {
        this.closeCollapsible();
      }
    }
  }

  handleTransitionEnd() {
    // Switch to height auto to make the container responsive
    if (!this.state.isClosed) {
      this.setState({ height: 'auto', inTransition: false });
    } else {
      this.setState({ inTransition: false });
    }
  }

  render() {
    var style = {
      height: this.state.height
    }

    var openClass = this.state.isClosed ? 'is-closed' : 'is-open';

    // Construct CSS classes strings
    const triggerClassString = `collapse__section ${openClass} ${
      this.state.isClosed ? this.props.triggerClassName : this.props.triggerOpenedClassName
    }`;

    return(
      <div className="collapse">
        <div className={triggerClassString.trim()}>
          <span className="collapse__section-trigger"><i className="material-icons">keyboard_arrow_down</i></span>
          <div className="collapse__section-header" onClick={this.handleTriggerClick}>
            {this.props.triggerTitle}
          </div>
          <div className="collapse__section-content" style={style} onTransitionEnd={this.handleTransitionEnd}>
            <div className="collapse__section-content__inner" ref="inner">
              {this.props.children}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Collapse.defaultProps = {
  open: false,
  triggerSibling: null,
  inTransition: false,
  shouldSwitchAutoOnNextCycle: false,
};

export default Collapse;
