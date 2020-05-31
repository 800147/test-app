import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reduxThunk, { ThunkMiddleware } from 'redux-thunk';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

import { reducer } from './common/redux/reducer';
import { FlightPlans } from './features/FlightPlans/FlightPlans';
import { DronesConnected } from './features/Drones/Drones.container';

export const store = createStore(reducer, composeWithDevTools(applyMiddleware<ThunkMiddleware>(reduxThunk)));

const App: React.FC = () => (
    <Provider store={store}>
        <Router>
            <Switch>
                <Route exact path="/flight-plans" component={FlightPlans} />
                <Route exact path="/drones" component={DronesConnected} />
                <Route exact path="/"><Redirect to={{ pathname: '/drones' }} /></Route>
                <Route path="/">404</Route>
            </Switch>
        </Router>
    </Provider>
);

export default App;
