import React, { useState, useEffect } from 'react';

import transformEvent from './transformEvents';
import EventsTable from './EventsTable';

const App = () => {
  const [events, setEvents] = useState(false);

  useEffect(() => {
    fetch('/events.json')
      .then(res => res.json())
      .then(data => setEvents(data.map(event => transformEvent(event))));
  }, []);

  return (
    <div className="max-w-screen-lg mx-auto py-4">
      {events ? <EventsTable events={events} /> : 'Loading...'}
    </div>
  );
};

export default App;
