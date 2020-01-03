import React from "react";
import { Switch, Redirect } from "react-router-dom";

import { RouteWithLayout } from "./components";
import { Main as MainLayout, Home as HomeLayout } from "./layouts";
import {
    Dashboard as DashboardView,
    Account as AccountView,
    Settings as SettingsView,
    SignUp as SignUpView,
    SignIn as SignInView,
    Home as HomeView,
    NotFound as NotFoundView,
    Calendar as CalendarView,
    History as HistoryView,
    Report as ReportView
} from "./views";
import EntryFormView from "./views/entry-form";
import DetailView from "./views/detail";

const Routes: React.FC = () => {
    return (
        <Switch>
            <Redirect exact from="/" to="/home" />
            <RouteWithLayout
                component={HomeView}
                exact
                layout={HomeLayout}
                path="/home"
            />
            <RouteWithLayout
                component={DashboardView}
                exact
                layout={MainLayout}
                path="/dashboard"
            />
            <RouteWithLayout
                component={CalendarView}
                exact
                layout={MainLayout}
                path="/calendar"
            />
            <RouteWithLayout
                component={EntryFormView}
                exact
                layout={MainLayout}
                path="/entry/:itemId"
            />
            <RouteWithLayout
                component={DetailView}
                exact
                layout={MainLayout}
                path="/detail/:date"
            />
            <RouteWithLayout
                component={HistoryView}
                exact
                layout={MainLayout}
                path="/history"
            />
            <RouteWithLayout
                component={ReportView}
                exact
                layout={MainLayout}
                path="/report"
            />
            <RouteWithLayout
                component={AccountView}
                exact
                layout={MainLayout}
                path="/account"
            />
            <RouteWithLayout
                component={SettingsView}
                exact
                layout={MainLayout}
                path="/settings"
            />
            <RouteWithLayout
                component={SignUpView}
                exact
                layout={HomeLayout}
                path="/sign-up"
            />
            <RouteWithLayout
                component={SignInView}
                exact
                layout={HomeLayout}
                path="/sign-in"
            />
            <RouteWithLayout
                component={NotFoundView}
                exact
                layout={HomeLayout}
                path="/not-found"
            />
            <Redirect to="/not-found" />
        </Switch>
    );
};

export default Routes;
