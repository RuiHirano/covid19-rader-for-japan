import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { Dispatch, Action } from "redux";
import SignUp from "./SignUp";
import { AppState, ActionTypes } from "../../redux/configureStore";
import { signActions, SignUpState } from "../../redux/saga/Sign/signSaga";
import { withRouter, RouteComponentProps, match } from "react-router";
import { Loading, LoadingState } from "../../types";
import * as H from "history";

interface Props {
    handleSignUp: (signUpState: SignUpState) => void;
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

const SignUpContainer: React.FC<Props> = props => {
    const { history, handleSignUp, isLoading, loadingState } = props;
    const prevIsLoading = usePrevious(isLoading);

    const handleBack = () => {
        history.goBack();
    };

    useEffect(() => {
        console.log("useEffect", isLoading, loadingState);
        if (
            prevIsLoading &&
            !isLoading &&
            loadingState == LoadingState.SIGN_UP
        ) {
            history.push("/dashboard");
        }
    }, [isLoading]);

    return <SignUp handleBack={handleBack} handleSignUp={handleSignUp} />;
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
        handleSignUp: (signUpState: SignUpState) =>
            dispatch(signActions.signUpAction(signUpState))
    };
}

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(SignUpContainer)
);
