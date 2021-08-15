import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import ServiceEditor from './components/ServiceEditor';
import ServiceListViewer from './components/ServiceListViewer';

export const serverURL = 'https://ra-thunk-redux-back.herokuapp.com/api/services';

export default function App() {
  return (
    <Router basename='/ra-redux-thunx-api'>
        <Route exact path={`/`}>
            <Redirect to={`/services`} />
        </Route>

        <div className='wrapper>'>
            <div className='container'>
              <Switch>
              <Route
              path={`/services`}
              exact
              render={(props) => <ServiceListViewer {...props} />}
            />
              <Route
              path={`/services/:id`}
              exact
              render={(props) => <ServiceEditor {...props} />}
            />
          </Switch>
          </div>
        </div>
    </Router>
  );
}
