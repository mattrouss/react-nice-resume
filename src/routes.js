import React from 'react';
import Home from './Components/Home';
import NoMatch from './Components/NoMatch';
import { Route, Switch, Redirect } from 'react-router-dom';

export const Routes = () => {
    return (
        <div>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route component={NoMatch} />
            </Switch>
        </div>
    );
}