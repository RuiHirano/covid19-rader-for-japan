import React, { useState, useEffect } from "react";
import { withRouter, match } from "react-router-dom";
import { makeStyles, Theme } from "@material-ui/core/styles";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { IconButton } from "@material-ui/core";
import * as H from "history";

// Container
interface ContainerProps {
    history: H.History;
    location: H.Location;
    match: match;
}

const BackButtonContainer: React.FC<ContainerProps> = props => {
    const { history } = props;

    const handleBack = () => {
        history.goBack();
    };

    return <BackButton handleBack={handleBack} />;
};

export default withRouter(BackButtonContainer);

// Presentational
interface Props {
    handleBack: () => void;
}

const BackButton: React.FC<Props> = props => {
    const { handleBack } = props;
    const classes = useStyles();

    return (
        <IconButton onClick={handleBack}>
            <ArrowBackIcon />
        </IconButton>
    );
};

const useStyles = makeStyles((theme: Theme) => ({}));
