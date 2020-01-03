import React from "react";
import { useDispatch } from "react-redux";

import NameField from "./name-field";
import PasswordConfirmField from "./password-confirm-field";
import PasswordField from "./password-field";
import EmailField from "./email-field";
import PolicyField from "./policy-field";
import Title from "./title";
import SubmitButton from "./submit-button";
import ToSignIn from "./to-sign-in";
import { styled } from "@material-ui/core/styles";
import theme from "../../../../styles/theme";

import { Formik } from "formik";
import * as Yup from "yup";
import { SignUpState, signActions } from "../../../../redux/saga/sign";

// Container

const SignUpFormContainer: React.FC = () => {
    const dispatch = useDispatch();
    const handleSignUp = (signUpState: SignUpState) => {
        dispatch(signActions.signUpAction(signUpState));
    };

    return <SignUpForm handleSignUp={handleSignUp} />;
};

export default SignUpFormContainer;

interface Props {
    handleSignUp: (signUpState: SignUpState) => void;
}

const SignUpForm: React.FC<Props> = props => {
    const { handleSignUp } = props;

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
            .oneOf(
                [Yup.ref("password")],
                "i18n.t('su_not_match_confirm_password')"
            )
            .required("i18n.t('su_required_password')")
    };

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
                <Container>
                    <Title />

                    <NameField
                        errors={errors}
                        touched={touched}
                        values={values}
                        handleBlur={handleBlur}
                        handleChange={handleChange}
                    />
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
                    <PasswordConfirmField
                        errors={errors}
                        touched={touched}
                        values={values}
                        handleBlur={handleBlur}
                        handleChange={handleChange}
                    />
                    <PolicyField
                        values={values}
                        setFieldValue={setFieldValue}
                    />
                    <SubmitButton handleSubmit={handleSubmit} values={values} />

                    <ToSignIn />
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
