import React from "react";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./styles/theme";
import "react-perfect-scrollbar/dist/css/styles.css";
import "./assets/scss/index.scss";
import Routes from "./Routes";
import configureStore from "./redux/store";
import { Provider as ReduxProvider } from "react-redux";
import InitProvider from "./components/init-provider";

const browserHistory = createBrowserHistory();

const { store } = configureStore();

const App: React.FC = () => {
    return (
        <ReduxProvider store={store}>
            <ThemeProvider theme={theme}>
                <InitProvider>
                    <Router history={browserHistory}>
                        <Routes />
                    </Router>
                </InitProvider>
            </ThemeProvider>
        </ReduxProvider>
    );
};

export default App;
