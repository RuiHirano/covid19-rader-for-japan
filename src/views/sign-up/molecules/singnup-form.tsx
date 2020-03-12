import React, { useEffect } from "react";
import { withRouter, match } from "react-router";
import * as H from "history";
import { styled } from "@material-ui/core/styles";
import * as Yup from "yup";
import { useSignUp } from "../../../redux/hooks/useAuth";
import { Formik } from "formik";
import theme from "../../../styles/theme";
import { Link as RouterLink } from "react-router-dom";
import { TextField, Typography, Link, Checkbox, Button } from "@material-ui/core";


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


interface Props {
    history: H.History;
    location: H.Location;
    match: match;
}

const SignUpForm: React.FC<Props> = props => {
    const { history } = props
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
                        <TitleText variant="h2">Sign up</TitleText>
                        <Typography color="textSecondary" gutterBottom>
                            Sign up with social media
                        </Typography>

                        <NameTextField
                            error={errors.name && touched.name ? true : false}
                            fullWidth
                            helperText={errors.name && touched.name ? errors.name : null}
                            label="Name"
                            name="Name"
                            onChange={handleChange("name")}
                            type="name"
                            value={values.name}
                            variant="outlined"
                            onBlur={handleBlur("name")}
                        />

                        <EmailTextField
                            error={errors.email && touched.email ? true : false}
                            fullWidth
                            helperText={errors.email && touched.email ? errors.email : null}
                            label="Email"
                            name="Email"
                            onChange={handleChange("email")}
                            type="text"
                            value={values.email}
                            variant="outlined"
                            onBlur={handleBlur("email")}
                        />

                        <PasswordTextField
                            error={errors.password && touched.password ? true : false}
                            fullWidth
                            helperText={errors.password && touched.password ? errors.password : null}
                            label="Password"
                            name="Password"
                            onChange={handleChange("password")}
                            type="password"
                            value={values.password}
                            variant="outlined"
                            onBlur={handleBlur("password")}
                        />

                        <PasswordConfirmTextField
                            error={
                                errors.passwordConfirm && touched.passwordConfirm ? true : false
                            }
                            fullWidth
                            helperText={
                                errors.passwordConfirm && touched.passwordConfirm
                                    ? errors.passwordConfirm
                                    : null
                            }
                            label="Confirm Password"
                            name="Confirm Password"
                            onChange={handleChange("passwordConfirm")}
                            type="password"
                            value={values.passwordConfirm}
                            variant="outlined"
                            onBlur={handleBlur("passwordConfirm")}
                        />

                        <PolicyConteiner>
                            <PolicyCheckbox
                                checked={values.policy || false}
                                color="primary"
                                name="policy"
                                onChange={() => setFieldValue("policy", !values.policy)}
                            />
                            <Typography color="textSecondary" variant="body1">
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
                        </PolicyConteiner>

                        <SignUpButton
                            color="primary"
                            disabled={!values.policy}
                            fullWidth
                            size="large"
                            type="submit"
                            variant="contained"
                            onClick={() => handleSubmit()}
                        >
                            Sign up now
                        </SignUpButton>

                        <Typography color="textSecondary" variant="body1">
                            Have an account?{" "}
                            <Link component={RouterLink} to="/sign-in" variant="h6">
                                Sign in
                            </Link>
                        </Typography>
                    </Container>
                )}
            </Formik>
    );
};

export default withRouter(SignUpForm);


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

const NameTextField = styled(TextField)({
    marginTop: theme.spacing(2)
});

const EmailTextField = styled(TextField)({
    marginTop: theme.spacing(2)
});

const PasswordTextField = styled(TextField)({
    marginTop: theme.spacing(2)
});

const PasswordConfirmTextField = styled(TextField)({
    marginTop: theme.spacing(2)
});

const PolicyCheckbox = styled(Checkbox)({
    marginLeft: "-14px"
});

const PolicyConteiner = styled("div")({
    marginTop: theme.spacing(1),
    display: "flex",
    alignItems: "center"
});

const TitleText = styled(Typography)({
    marginTop: theme.spacing(3)
});

const SignUpButton = styled(Button)({
    margin: theme.spacing(2, 0)
});