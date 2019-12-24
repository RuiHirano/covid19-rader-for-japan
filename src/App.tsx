import React, { Component } from "react";
import { Router, BrowserRouter } from "react-router-dom";
import { createBrowserHistory } from "history";
//import { Chart } from 'react-chartjs-2';
import { ThemeProvider } from "@material-ui/core/styles";
import validate from "validate.js";

import { chartjs } from "./helpers";
import theme from "./theme";
import "react-perfect-scrollbar/dist/css/styles.css";
import "./assets/scss/index.scss";
import validators from "./common/validators";
import Routes from "./Routes";
import configureStore from "./redux/configureStore";
import { Provider as ReduxProvider } from "react-redux";

const Chart = require("react-chartjs-2").Chart;

const browserHistory = createBrowserHistory();

Chart.helpers.extend(Chart.elements.Rectangle.prototype, {
    draw: chartjs.draw
});

validate.validators = {
    ...validate.validators,
    ...validators
};

const { store, persistor } = configureStore();

const App: React.FC = () => {
    return (
        <ReduxProvider store={store}>
            <ThemeProvider theme={theme}>
                <Router history={browserHistory}>
                    <Routes />
                </Router>
            </ThemeProvider>
        </ReduxProvider>
    );
};

export default App;
