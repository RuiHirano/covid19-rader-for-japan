import React, { useEffect } from "react";
import { default as firebase } from "../../redux/firebase";
import { withRouter, match } from "react-router";
import * as H from "history";

interface Props {
    children?: any;
    history: H.History;
    location: H.Location;
    match: match;
}

const Auth: React.FC<Props> = props => {
    const { children, history } = props;
    useEffect(() => {
        firebase.auth().onAuthStateChanged(function(user) {
            if (!user) {
                // No user is signed in.
                history.push("/home");
            }
        });
    }, []);

    return <div>{children}</div>;
};

export default withRouter(Auth);
