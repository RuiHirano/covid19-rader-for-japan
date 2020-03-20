import React from "react";
import { Route } from "react-router-dom";
import Auth from "../auth";
import DialogComponent from "../dialog";

interface Props {
    path: string;
    exact?: boolean;
    auth?: boolean;
    component: any;
    layout: any;
}

const RouteWithLayout: React.FC<Props> = props => {
    const { layout: Layout, component: Component, auth, ...rest } = props;

    return (
        <Route
            {...rest}
            render={matchProps => {
                if (auth) {
                    return (
                        <Auth>
                            <Component {...matchProps} />
                        </Auth>
                    );
                } else {
                    return (
                        <Component {...matchProps} />
                    );
                }
            }}
        />
    );
};

export default RouteWithLayout;
