import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { Dispatch, Action } from "redux";
import { AppState, ActionTypes } from "../../redux/configureStore";
import * as H from "history";
import { withRouter, match } from "react-router";
import { Item, Loading, MarketType, TradeType } from "../../types";
import { useSelector, useDispatch } from "react-redux";
import DetailView from "./Detail";

interface Props {
    history: H.History;
    location: H.Location;
    match: match<{ itemId: string }>;
    isLoading: Loading["IsLoading"];
    loadingState: Loading["LoadingState"];
}

const Container: React.FC<Props> = props => {
    const { isLoading, loadingState } = props;
    const items = useSelector((state: AppState) => state.Items);
    useEffect(() => {});

    return <DetailView items={items} />;
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
    connect(mapStateToProps, mapDispatchToProps)(Container)
);
