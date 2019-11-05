import React, { useState, useEffect } from "react";
import { Link as RouterLink, withRouter } from "react-router-dom";
import PropTypes, { string } from "prop-types";
import validate from "validate.js";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { Link, Typography } from "@material-ui/core";
import { FormikHelpers, FormikValues } from "formik";

const useStyles = makeStyles((theme: Theme) => ({}));

interface Props {}

const ToSignIn: React.FC<Props> = props => {
    const classes = useStyles();

    return (
        <Typography color="textSecondary" variant="body1">
            Have an account?{" "}
            <Link component={RouterLink} to="/sign-in" variant="h6">
                Sign in
            </Link>
        </Typography>
    );
};

export default ToSignIn;
