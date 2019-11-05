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
import { FormikHelpers, FormikValues } from "formik";

const useStyles = makeStyles((theme: Theme) => ({
    policy: {
        marginTop: theme.spacing(1),
        display: "flex",
        alignItems: "center"
    },
    policyCheckbox: {
        marginLeft: "-14px"
    }
}));

interface Props {
    setFieldValue: FormikHelpers<FormikValues>["setFieldValue"];
    values: {
        email: string;
        password: string;
        name: string;
        passwordConfirm: string;
        policy: boolean;
    };
}

const PolicyField: React.FC<Props> = props => {
    const { setFieldValue, values } = props;

    const classes = useStyles();

    return (
        <div className={classes.policy}>
            <Checkbox
                checked={values.policy || false}
                className={classes.policyCheckbox}
                color="primary"
                name="policy"
                onChange={() => setFieldValue("policy", !values.policy)}
            />
            <Typography
                //className={classes.policyText}
                color="textSecondary"
                variant="body1"
            >
                I have read the{" "}
                <Link
                    color="primary"
                    component={RouterLink}
                    to="#"
                    underline="always"
                    variant="h6"
                >
                    Terms and Conditions
                </Link>
            </Typography>
        </div>
    );
};

export default PolicyField;
