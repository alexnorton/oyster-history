import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  NavLink,
} from 'react-router-dom';

import transformEvent from './transformEvents';

import Table from './pages/Table';
import TopStations from './pages/TopStations';

const pages = [
  { name: 'Table', path: '/table', component: Table },
  { name: 'Top Stations', path: '/top-stations', component: TopStations },
];

const App = () => {
  const [events, setEvents] = useState(false);

  useEffect(() => {
    fetch('/events.json')
      .then(res => res.json())
      .then(data => setEvents(data.map(event => transformEvent(event))));
  }, []);

  if (!events) return 'Loading...';

  return (
    <Router>
      <div>
        <div>
          {pages.map(({ path, name }) => (
            <NavLink key={path} to={path} activeClassName="font-bold">
              {name}
            </NavLink>
          ))}
        </div>
        <div className="max-w-screen-lg mx-auto py-4">
          <Switch>
            {pages.map(({ path, component: Component }) => (
              <Route
                key={path}
                path={path}
                render={() => <Component events={events} />}
              />
            ))}
            <Route exact path="/">
              <Redirect to={pages[0].path} />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
