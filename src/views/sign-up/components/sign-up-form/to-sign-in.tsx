import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { Link, Typography } from "@material-ui/core";

interface Props {}

const ToSignIn: React.FC<Props> = props => {
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
