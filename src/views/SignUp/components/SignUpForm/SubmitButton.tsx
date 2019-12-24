import React, { useState, useEffect } from "react";
import { Link as RouterLink, withRouter } from "react-router-dom";
import PropTypes, { string } from "prop-types";
import validate from "validate.js";
import { makeStyles, Theme } from "@material-ui/core/styles";
import {
    Grid,
    Button,
    IconButton,
    TextField,
    Link,
    FormHelperText,
    Checkbox,
    Typography
} from "@material-ui/core";
import { FormikHelpers, FormikValues, FormikHandlers } from "formik";

const useStyles = makeStyles((theme: Theme) => ({
    signUpButton: {
        margin: theme.spacing(2, 0)
    }
}));

interface Props {
    handleSubmit: FormikHandlers["handleSubmit"];
    values: {
        email: string;
        password: string;
        name: string;
        passwordConfirm: string;
        policy: boolean;
    };
}

const SubmitButton: React.FC<Props> = props => {
    const { handleSubmit, values } = props;

    const classes = useStyles();

    return (
        <Button
            className={classes.signUpButton}
            color="primary"
            disabled={!values.policy}
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            onClick={() => handleSubmit()}
        >
            Sign up now
        </Button>
    );
};

export default SubmitButton;
