import React, { useEffect } from "react";
import { withRouter, match } from "react-router-dom";
import * as H from "history";
import { styled } from "@material-ui/core/styles";
import { useSignIn } from "../../../redux/hooks/useAuth";
import { Formik } from "formik";
import * as Yup from "yup";
import theme from "../../../styles/theme";
import { Link as RouterLink } from "react-router-dom";
import { Typography, Grid, Button, Link, TextField } from "@material-ui/core";
import {
    Facebook as FacebookIcon,
    Google as GoogleIcon
} from "../../../icons";


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

interface Props {
    history: H.History;
    location: H.Location;
    match: match;
}

const SignInForm: React.FC<Props> = props => {
    const { history } = props

    const {signIn, status} = useSignIn()
    const handleSignIn = (email: string, password: string) => {
        console.log("sign in", email, password)
        signIn(email, password)
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
                <TitleText variant="h2">Sign in</TitleText>
                <Typography color="textSecondary" gutterBottom>
                    Sign in with social media
                </Typography>

                <SocialButtonGrid container spacing={2}>
                    <Grid item>
                        <Button
                            color="primary"
                            onClick={() => console.log("Facebook")}
                            size="large"
                            variant="contained"
                        >
                            <FacebookSocialIcon />
                            Login with Facebook
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            onClick={() => console.log("Google")}
                            size="large"
                            variant="contained"
                        >
                            <GoogleSocialIcon />
                            Login with Google
                        </Button>
                    </Grid>
                </SocialButtonGrid>
                <Sugestion align="center" color="textSecondary" variant="body1">
                    or login with email address
                </Sugestion>

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

                <SignUpButton
                    color="primary"
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    onClick={() => handleSubmit()}
                >
                    Sign in now
                </SignUpButton>

                <Typography color="textSecondary" variant="body1">
                    Don't have an account?{" "}
                    <Link component={RouterLink} to="/sign-up" variant="h6">
                        Sign up
                    </Link>
                </Typography>
            </Container>
        )}
    </Formik>

    );
};

export default withRouter(SignInForm);

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

const TitleText = styled(Typography)({
    marginTop: theme.spacing(3)
});
const SocialButtonGrid = styled(Grid)({
    marginTop: theme.spacing(3)
});

const FacebookSocialIcon = styled(FacebookIcon)({
    marginRight: theme.spacing(1)
});

const GoogleSocialIcon = styled(GoogleIcon)({
    marginRight: theme.spacing(1)
});

const Sugestion = styled(Typography)({
    marginTop: theme.spacing(2)
});

const PasswordTextField = styled(TextField)({
    marginTop: theme.spacing(2)
});

const EmailTextField = styled(TextField)({
    marginTop: theme.spacing(2)
});

const SignUpButton = styled(Button)({
    margin: theme.spacing(2, 0)
});