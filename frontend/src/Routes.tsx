import React from "react";
import { Switch, Redirect, Route } from "react-router-dom";

import {
    Dashboard as DashboardView,
    NotFound as NotFoundView,
    Map as MapView
} from "./views";

const Routes: React.FC = () => {
    return (
        <Switch>
            <Redirect exact from="/" to="/dashboard" />
            <Route path="/dashboard" component={DashboardView} />
            {/*<Route path="/map" component={MapView} />*/}
            <Route path="/not-found" component={NotFoundView} />
            <Redirect to="/not-found" />
        </Switch>
    );
};

export default Routes;
