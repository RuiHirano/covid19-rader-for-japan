import React, { useEffect } from "react";

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
import { useSignIn } from "../../../../redux/hooks/useAuth";
import { withRouter, match } from "react-router";
import * as H from "history";

// Container
interface RouteProps {
    history: H.History;
    location: H.Location;
    match: match;
}

const SignInFormContainer: React.FC<RouteProps> = (props) => {
    const {history} = props
    const dispatch = useDispatch();
    const {signIn, status} = useSignIn()
    const handleSignIn = (email: string, password: string) => {
        console.log("sign in", email, password)
        signIn(email, password)
    };

    useEffect(()=>{
        console.log("signIn status change", status.Progress)
        if(status.Progress === 100){
            history.push("/")
        }
        if(status.Error !== ""){
            console.log("error occer: ", status.Error)
        }

    }, [status])

    return <SignInForm handleSignIn={handleSignIn} />;
};

export default withRouter(SignInFormContainer);

// Presentational
interface Props {
    handleSignIn: (email: string, password: string) => void;
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
            onSubmit={values => handleSignIn(values.email, values.password)}
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
