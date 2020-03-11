import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

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
import { useSignUp } from "../../../../redux/hooks/useAuth";
import { ReduxState } from "../../../../redux/module";
import { User } from "../../../../types";
import { withRouter, match } from "react-router";
import * as H from "history";

// Container
interface RouteProps {
    history: H.History;
    location: H.Location;
    match: match;
}

const SignUpFormContainer: React.FC<RouteProps> = (props) => {
    const {history} = props
    const dispatch = useDispatch();
    const {signUp, status} = useSignUp()
    const handleSignUp = (name: string, email: string, password: string) => {
        console.log("Sign Up", name, email, password)
        signUp(name, email, password)
    };

    useEffect(()=>{
        console.log("signIn status change", status.Progress)
        if(status.Progress === 100){
            history.push("/dashboard")
        }
        if(status.Error !== ""){
            console.log("error occer: ", status.Error)
        }

    }, [status])

    return <SignUpForm handleSignUp={handleSignUp} />;
};

export default withRouter(SignUpFormContainer);

interface Props {
    handleSignUp: (name: string, email: string, password: string) => void;
}

const SignUpForm: React.FC<Props> = props => {
    const { handleSignUp } = props;
    const user = useSelector((state: ReduxState)=>state.User)
    console.log("user json: ", JSON.stringify(user))
    console.log("user parse: ", JSON.parse(JSON.stringify(user)))
    //const test: User = new User
    //test.setJson(JSON.stringify(user))
    //console.log("user parse: ", test)

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
            onSubmit={values => handleSignUp(values.name, values.email, values.password)}
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
