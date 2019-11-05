import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { Dispatch, Action } from "redux";
import SignIn from "./SignIn";
import { AppState, ActionTypes } from "./../../redux/configureStore";
import { SignInState, signActions } from "../../redux/saga/Sign/signSaga";
import { withRouter, RouteComponentProps, match } from "react-router";
import { Loading, LoadingState } from "../../types";
import * as H from "history";

interface Props {
    handleSignIn: (signInState: SignInState) => void;
    isLoading: Loading["IsLoading"];
    loadingState: Loading["LoadingState"];
    history: H.History;
    location: H.Location;
    match: match;
}

function usePrevious(value: any) {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
}

const SignInContainer: React.FC<Props> = props => {
    const { history, handleSignIn, isLoading, loadingState } = props;
    const prevIsLoading = usePrevious(isLoading);

    const handleBack = () => {
        history.goBack();
    };

    useEffect(() => {
        console.log("useEffect", isLoading, loadingState);
        if (
            prevIsLoading &&
            !isLoading &&
            loadingState == LoadingState.SIGN_IN
        ) {
            history.push("/dashboard");
        }
    }, [isLoading]);

    return <SignIn handleBack={handleBack} handleSignIn={handleSignIn} />;
};

function mapStateToProps(state: AppState) {
    const loading = state.App.Loading;
    return {
        isLoading: loading.IsLoading,
        loadingState: loading.LoadingState
    };
}

function mapDispatchToProps(dispatch: Dispatch<Action>) {
    return {
        handleSignIn: (signInState: SignInState) =>
            dispatch(signActions.signInAction(signInState))
    };
}

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(SignInContainer)
);
