import React, { useState, useEffect } from "react";
import { Link as RouterLink, withRouter } from "react-router-dom";
import PropTypes, { string } from "prop-types";
import validate from "validate.js";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

import PasswordField from "./PasswordField";
import EmailField from "./EmailField";
import Title from "./Title";
import SubmitButton from "./SubmitButton";
import ToSignUp from "./ToSignUp";

import { Formik, yupToFormErrors } from "formik";
import * as Yup from "yup";
import { SignUpState } from "../../../redux/saga/Sign/signSaga";
import SocialIcon from "./SocialSignIn";

const useStyles = makeStyles((theme: Theme) => ({
    form: {
        paddingLeft: 100,
        paddingRight: 100,
        paddingBottom: 125,
        flexBasis: 700,
        [theme.breakpoints.down("sm")]: {
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2)
        }
    }
}));

const initialValues = {
    email: "",
    password: "",
    name: "",
    passwordConfirm: "",
    policy: false
};

const validationSchema = {
    name: Yup.string().required("i18n.t('su_required_name')"),
    email: Yup.string()
        .email("i18n.t('su_wrong_email')")
        .required("i18n.t('su_required_email')"),
    password: Yup.string()
        .min(8, "i18n.t('su_min_password')")
        .matches(/^[a-zA-Z0-9]+$/, "i18n.t('su_not_match_password')")
        .required("i18n.t('su_required_password')"),
    passwordConfirm: Yup.string()
        .oneOf([Yup.ref("password")], "i18n.t('su_not_match_confirm_password')")
        .required("i18n.t('su_required_password')")
};

interface Props {
    handleSignUp: (signUpState: SignUpState) => void;
}

const SignInForm: React.FC<Props> = props => {
    const { handleSignUp } = props;
    const classes = useStyles();

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={values => handleSignUp(values)}
            validationSchema={Yup.object().shape(validationSchema)}
        >
            {({
                handleChange,
                handleSubmit,
                values,
                errors,
                touched,
                handleBlur,
                setFieldValue
            }) => (
                <div className={classes.form}>
                    <Title />

                    <SocialIcon />

                    <EmailField
                        errors={errors}
                        touched={touched}
                        values={values}
                        handleBlur={handleBlur}
                        handleChange={handleChange}
                    />
                    <PasswordField
                        errors={errors}
                        touched={touched}
                        values={values}
                        handleBlur={handleBlur}
                        handleChange={handleChange}
                    />
                    <SubmitButton handleSubmit={handleSubmit} values={values} />

                    <ToSignUp />
                </div>
            )}
        </Formik>
    );
};

export default SignInForm;
