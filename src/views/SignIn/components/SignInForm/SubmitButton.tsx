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
    signInButton: {
        margin: theme.spacing(2, 0)
    }
}));

interface Props {
    handleSubmit: FormikHandlers["handleSubmit"];
}

const SubmitButton: React.FC<Props> = props => {
    const { handleSubmit } = props;

    const classes = useStyles();

    return (
        <Button
            className={classes.signInButton}
            color="primary"
            disabled={false}
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
