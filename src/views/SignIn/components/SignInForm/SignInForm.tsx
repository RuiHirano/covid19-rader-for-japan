import React from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";

import PasswordField from "./PasswordField";
import EmailField from "./EmailField";
import Title from "./Title";
import SubmitButton from "./SubmitButton";
import ToSignUp from "./ToSignUp";
import { useDispatch } from "react-redux";

import { Formik } from "formik";
import * as Yup from "yup";
import SocialIcon from "./SocialSignIn";
import { SignInState, signActions } from "../../../../redux/saga/Sign/signSaga";

// Container

const SignInFormContainer: React.FC = () => {
    const dispatch = useDispatch();
    const handleSignIn = (signInState: SignInState) => {
        dispatch(signActions.signInAction(signInState));
    };

    return <SignInForm handleSignIn={handleSignIn} />;
};

export default SignInFormContainer;

// Presentational
interface Props {
    handleSignIn: (signInState: SignInState) => void;
}

const SignInForm: React.FC<Props> = props => {
    const { handleSignIn } = props;
    const classes = useStyles();

    const initialValues = {
        email: "",
        password: ""
    };

    const validationSchema = {
        email: Yup.string()
            .email("i18n.t('su_wrong_email')")
            .required("i18n.t('su_required_email')"),
        password: Yup.string()
            .min(8, "i18n.t('su_min_password')")
            .matches(/^[a-zA-Z0-9]+$/, "i18n.t('su_not_match_password')")
            .required("i18n.t('su_required_password')")
    };

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={values => handleSignIn(values)}
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
                    <SubmitButton handleSubmit={handleSubmit} />

                    <ToSignUp />
                </div>
            )}
        </Formik>
    );
};

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
