import React, { Component } from 'react';
import transformEvent from './transformEvents';

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

  renderEvents(events) {
    return (
      <table>
        <thead>
          <tr>
            <th>Start time</th>
            <th>End time</th>
            <th>Action</th>
            <th>Charge</th>
            <th>Credit</th>
            <th>Balance</th>
            <th>Note</th>
          </tr>
        </thead>
        <tbody>
          {events
            .sort(
              (a, b) => (b.startTime || b.endTime) - (a.startTime || a.endTime)
            )
            .map((event, index) => (
              <tr key={index}>
                <td>{event.startTime && event.startTime.toLocaleString()}</td>
                <td>{event.endTime && event.endTime.toLocaleString()}</td>
                <td>{event.action}</td>
                <td>
                  {event.charge !== null && `£${event.charge.toFixed(2)}`}
                </td>
                <td>
                  {event.credit !== null && `£${event.credit.toFixed(2)}`}
                </td>
                <td>
                  {event.balance !== null && `£${event.balance.toFixed(2)}`}
                </td>
                <td>{event.note}</td>
              </tr>
            ))}
        </tbody>
      </table>
    );
  }

  render() {
    return (
      <div>
        <h1>Oyster history</h1>
        {this.state.events
          ? this.renderEvents(this.state.events)
          : 'Loading...'}
      </div>
    );
  }
}

export default App;
