
import './index.css';
import * as serviceWorker from './serviceWorker';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'
import { BrowserRouter, Switch, Route } from 'react-router-dom'


ReactDOM.render(<BrowserRouter>
    <Switch>
        <Route path="/" exact={true} component={App} />
    </Switch>
</ BrowserRouter>, document.getElementById('root'));

serviceWorker.unregister();
