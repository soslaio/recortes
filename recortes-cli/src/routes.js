
import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { isAuthenticated } from "./services/auth";
import Login from './pages/Login/';
import Layout from './pages/Layout/';


// Grampeia o método render do Route para adicionar a verificação de estar logado ou não.
const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props => isAuthenticated() ?
            (<Component {...props} />) :
            (<Redirect to={{ pathname: "/login", state: { from: props.location } }} />)
        }
    />
);

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <PrivateRoute exact path="/" component={Layout} />
            <PrivateRoute path="/(nup|data|termos|config)" component={Layout} />
            <Route path="/login" component={Login} />
            <Route path="*" component={() => <h1>Page not found</h1>} />
        </Switch>
    </BrowserRouter>
);

export default Routes;
