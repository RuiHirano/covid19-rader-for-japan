import React, { useState, useEffect } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { IconButton } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({}));

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

export default BackButton;
