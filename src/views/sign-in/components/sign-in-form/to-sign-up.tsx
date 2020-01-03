import React from "react";
import { Link as RouterLink, withRouter } from "react-router-dom";
import { Link, Typography } from "@material-ui/core";

interface Props {}

const ToSignUp: React.FC<Props> = props => {
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
