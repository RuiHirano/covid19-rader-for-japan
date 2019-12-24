import React, { useState, useEffect } from "react";
import { Link as RouterLink, withRouter } from "react-router-dom";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { Link, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({}));

interface Props {}

const ToSignUp: React.FC<Props> = props => {
    const classes = useStyles();

    return (
        <Typography color="textSecondary" variant="body1">
            Don't have an account?{" "}
            <Link component={RouterLink} to="/sign-up" variant="h6">
                Sign up
            </Link>
        </Typography>
    );
};

export default ToSignUp;
