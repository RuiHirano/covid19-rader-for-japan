import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { Dispatch, Action } from "redux";
import { AppState, ActionTypes } from "../../redux/configureStore";
import * as H from "history";
import { withRouter, match } from "react-router";
import { Item, Loading, MarketType, TradeType } from "../../types";
import DetailView from "./Detail";
import { mockItems } from "../../common/mockData";

interface Props {
    history: H.History;
    location: H.Location;
    match: match<{ itemId: string }>;
    isLoading: Loading["IsLoading"];
    loadingState: Loading["LoadingState"];
}

const Container: React.FC<Props> = props => {
    const { isLoading, loadingState } = props;

    useEffect(() => {
        console.log("mockItem", mockItems);
    });

    return <DetailView items={mockItems} />;
};

function mapStateToProps(state: AppState) {
    const loading = state.App.Loading;
    return {
        isLoading: loading.IsLoading,
        loadingState: loading.LoadingState
    };
}

function mapDispatchToProps(dispatch: Dispatch<Action>) {
    return {};
}

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(Container)
);
