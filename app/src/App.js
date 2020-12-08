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
      <div className="max-w-screen-lg mx-auto py-4">
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
