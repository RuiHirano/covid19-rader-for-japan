import React, { useState, useEffect } from "react";
import { Link as RouterLink, withRouter } from "react-router-dom";
import PropTypes, { string } from "prop-types";
import validate from "validate.js";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
    title: {
        marginTop: theme.spacing(3)
    }
}));

interface Props {}

const Title: React.FC<Props> = props => {
    const classes = useStyles();

    return (
        <div>
            <Typography className={classes.title} variant="h2">
                Create new account
            </Typography>
            <Typography color="textSecondary" gutterBottom>
                Use your email to create new account
            </Typography>
        </div>
    );
};

export default Title;
