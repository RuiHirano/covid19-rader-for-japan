import React from "react";

import PasswordField from "./password-field";
import EmailField from "./email-field";
import Title from "./title";
import SubmitButton from "./submit-button";
import ToSignUp from "./to-sign-up";
import { useDispatch } from "react-redux";
import { styled } from "@material-ui/core/styles";
import theme from "../../../../styles/theme";

import { Formik } from "formik";
import * as Yup from "yup";
import SocialIcon from "./social-sign-in";
import { SignInState, signActions } from "../../../../redux/saga/sign";

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
                <Container>
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
                </Container>
            )}
        </Formik>
    );
};

const Container = styled("div")({
    paddingLeft: 100,
    paddingRight: 100,
    paddingBottom: 50,
    flexBasis: 700,
    [theme.breakpoints.down("sm")]: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2)
    }
});
