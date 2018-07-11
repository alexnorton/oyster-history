import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    fetch('/data.json')
      .then(res => res.json())
      .then(data => this.setState({ data }));
  }

  renderData(data) {
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
          {data.map((event, index) => (
            <tr key={index}>
              <td>{event[0] && new Date(event[0]).toLocaleString()}</td>
              <td>{event[1] && new Date(event[1]).toLocaleString()}</td>
              <td>{event[2]}</td>
              <td>{event[3] !== null && `£${event[3].toFixed(2)}`}</td>
              <td>{event[4] !== null && `£${event[4].toFixed(2)}`}</td>
              <td>{event[5] !== null && `£${event[5].toFixed(2)}`}</td>
              <td>{event[6]}</td>
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
        {this.state.data ? this.renderData(this.state.data) : 'Loading...'}
      </div>
    );
  }
}

export default App;
