import React, { Component } from 'react';

import transformEvent from './transformEvents';
import EventsTable from './EventsTable';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    fetch('/events.json')
      .then(res => res.json())
      .then(data =>
        this.setState({ events: data.map(event => transformEvent(event)) })
      );
  }

  render() {
    return (
      <div>
        <h1>Oyster history</h1>
        {this.state.events ? (
          <EventsTable events={this.state.events} />
        ) : (
          'Loading...'
        )}
      </div>
    );
  }
}

export default App;
