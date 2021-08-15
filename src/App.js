import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import ServiceEditor from './components/ServiceEditor';
import ServiceListViewer from './components/ServiceListViewer';

export const baseURL = 'https://ra-thunk-redux-back.herokuapp.com/api/services';
export const appURL = '/ra-redux-thunx-api';
export default function App() {
  return (
    <Router>
      <Route exact path={`/`}>
        <Redirect to={`${appURL}/services`} />
      </Route>
      <div className='wrapper>'>
        <div className='container'>
          <Switch>
            <Route
              path={`${appURL}/services`}
              exact
              render={(props) => <ServiceListViewer {...props} />}
            />
            <Route
              path={`${appURL}/services/:id`}
              exact
              render={(props) => <ServiceEditor {...props} />}
            />
          </Switch>
        </div>
      </div>
    </Router>
  );
}
