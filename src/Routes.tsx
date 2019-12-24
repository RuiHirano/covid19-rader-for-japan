import React from "react";
import { Switch, Redirect, Router, BrowserRouter } from "react-router-dom";

import { RouteWithLayout } from "./components";
import { Main as MainLayout, Minimal as MinimalLayout } from "./layouts";
import {
    Dashboard as DashboardView,
    //ProductList as ProductListView,
    //UserList as UserListView,
    //Typography as TypographyView,
    //Icons as IconsView,
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
import EntryFormView from "./views/EntryForm/EntryForm";
import DetailView from "./views/Detail/Detail";

const Routes: React.FC = () => {
    return (
        <Switch>
            <Redirect exact from="/" to="/home" />
            <RouteWithLayout
                component={HomeView}
                exact
                layout={MinimalLayout}
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
                layout={MinimalLayout}
                path="/sign-up"
            />
            <RouteWithLayout
                component={SignInView}
                exact
                layout={MinimalLayout}
                path="/sign-in"
            />
            <RouteWithLayout
                component={NotFoundView}
                exact
                layout={MinimalLayout}
                path="/not-found"
            />
            <Redirect to="/not-found" />
        </Switch>
    );
};

export default Routes;
