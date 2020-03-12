import React, { useEffect } from "react";
import { withRouter, match } from "react-router-dom";
import * as H from "history";
import { styled } from "@material-ui/core/styles";
import { useSignIn } from "../../../redux/hooks/useAuth";
import * as Yup from "yup";
import theme from "../../../styles/theme";
import { Link as RouterLink } from "react-router-dom";
import { Typography, Grid, Button, Link, TextField } from "@material-ui/core";
import {useForm, Controller} from 'react-hook-form'
import {
    Facebook as FacebookIcon,
    Google as GoogleIcon
} from "../../../icons";


const validationSchema = Yup.object().shape({
    email: Yup.string()
        .email("i18n.t('su_wrong_email')")
        .required("i18n.t('su_required_email')"),
    password: Yup.string()
        .min(8, "i18n.t('su_min_password')")
        .matches(/^[a-zA-Z0-9]+$/, "i18n.t('su_not_match_password')")
        .required("i18n.t('su_required_password')")
});

interface Props {
    history: H.History;
    location: H.Location;
    match: match;
}

const EmailSignIn: React.FC<Props> = props => {
    const { history } = props

    const {signIn, status} = useSignIn()

    useEffect(()=>{
        console.log("signIn status change", status.Progress)
        if(status.Progress === 100){
            history.push("/dashboard")
        }
        if(status.Error !== ""){
            console.log("error occer: ", status.Error)
        }

    }, [status])

    type FormData = {
        email: string;
        password: string;
      };

      const { handleSubmit, errors, control } = useForm<FormData>({validationSchema: validationSchema});
      const onSubmit = handleSubmit(({ email, password }) => {
        console.log("sign in", email, password)
        signIn(email, password)
      });

      return (
        <form onSubmit={onSubmit}>
<Sugestion align="center" color="textSecondary" variant="body1">
                or login with email address
            </Sugestion>
                <Controller 
                    as={
                        <EmailTextField
                            error={errors.email ? true : false}
                            fullWidth
                            helperText={errors.email ? errors.email.message : ""}
                            label="Email"
                            name="Email"
                            type="text"
                            variant="outlined"
                        />
                    } 
                    name="email" 
                    control={control} 
                    defaultValue=""
                />

                <Controller 
                    as={
                        <PasswordTextField
                            error={errors.password ? true : false}
                            fullWidth
                            helperText={errors.password ? errors.password.message : ""}
                            label="Password"
                            name="Password"
                            type="password"
                            variant="outlined"
                        />
                    } 
                    name="password" 
                    control={control} 
                    defaultValue="" 
                />

               

                <SignInButton
                    color="primary"
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    //onClick={onSubmit}
                >
                    Sign in now
                </SignInButton>

                <Typography color="textSecondary" variant="body1">
                    Don't have an account?{" "}
                    <Link component={RouterLink} to="/sign-up" variant="h6">
                        Sign up
                    </Link>
                </Typography>
            </form>
      );
};

export default withRouter(EmailSignIn);

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

const Sugestion = styled(Typography)({
    marginTop: theme.spacing(2)
});

const PasswordTextField = styled(TextField)({
    marginTop: theme.spacing(2)
});

const EmailTextField = styled(TextField)({
    marginTop: theme.spacing(2)
});

const SignInButton = styled(Button)({
    margin: theme.spacing(2, 0)
});