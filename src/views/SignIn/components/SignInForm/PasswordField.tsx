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
import {
    Formik,
    yupToFormErrors,
    FormikErrors,
    FormikValues,
    FormikTouched,
    FormikHandlers
} from "formik";

const useStyles = makeStyles((theme: Theme) => ({
    textField: {
        marginTop: theme.spacing(2)
    }
}));

interface Props {
    errors: FormikErrors<FormikValues>;
    touched: FormikTouched<FormikValues>;
    values: {
        email: string;
        password: string;
    };
    handleChange: FormikHandlers["handleChange"];
    handleBlur: FormikHandlers["handleBlur"];
}

const PasswordField: React.FC<Props> = props => {
    const { errors, touched, values, handleChange, handleBlur } = props;

    const classes = useStyles();

    return (
        <TextField
            className={classes.textField}
            error={errors.password && touched.password ? true : false}
            fullWidth
            helperText={
                errors.password && touched.password ? errors.password : null
            }
            label="Password"
            name="Password"
            onChange={handleChange("password")}
            type="password"
            value={values.password}
            variant="outlined"
            onBlur={handleBlur("password")}
        />
    );
};

export default PasswordField;
