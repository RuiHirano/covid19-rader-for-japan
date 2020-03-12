import React, { useEffect, useState } from "react";
import { withRouter, match } from "react-router";
import * as H from "history";
import { styled } from "@material-ui/core/styles";
import * as Yup from "yup";
import { useSignUp } from "../../../redux/hooks/useAuth";
import theme from "../../../styles/theme";
import { Link as RouterLink } from "react-router-dom";
import { TextField, Typography, Link, Checkbox, Button } from "@material-ui/core";
import { Controller, useForm } from "react-hook-form";


const validationSchema = Yup.object().shape({
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
});


interface Props {
    history: H.History;
    location: H.Location;
    match: match;
}

const SignUpForm: React.FC<Props> = props => {
    const { history } = props
    const {signUp, status} = useSignUp()

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
        name: string;
        email: string;
        password: string;
        passwordConfirm: string;
      };

    const { handleSubmit, errors, control } = useForm<FormData>({validationSchema: validationSchema});
    const onSubmit = handleSubmit(({ name, email, password, passwordConfirm }) => {
        console.log("Sign Up", name, email, password)
      signUp(name, email, password)
    });

    const [readPolicy, setReadPolisy] = useState<boolean>(false)

    return (
        <form onSubmit={onSubmit}>
                <Sugestion align="center" color="textSecondary" variant="body1">
                    signup with email address
                </Sugestion>
                <Controller 
                    as={
                        <NameTextField
                            error={errors.name ? true : false}
                            fullWidth
                            helperText={errors.name ? errors.name.message : ""}
                            label="Name"
                            name="Name"
                            type="text"
                            variant="outlined"
                        />
                    } 
                    name="name" 
                    control={control} 
                    defaultValue=""
                />

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

                <Controller
                    as={
                        <PasswordConfirmTextField
                            error={errors.passwordConfirm ? true : false}
                            fullWidth
                            helperText={errors.passwordConfirm ? errors.passwordConfirm.message : ""}
                            label="Password Confirm"
                            name="Password Confirm"
                            type="password"
                            variant="outlined"
                        />
                    } 
                    name="passwordConfirm" 
                    control={control} 
                    defaultValue="" 
                />

                <PolicyConteiner>
                    <PolicyCheckbox
                        checked={readPolicy || false}
                        color="primary"
                        name="policy"
                        onChange={()=>setReadPolisy(!readPolicy)}
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
                    disabled={!readPolicy}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    //onClick={() => handleSubmit()}
                >
                    Sign up now
                </SignUpButton>

                <Typography color="textSecondary" variant="body1">
                    Have an account?{" "}
                    <Link component={RouterLink} to="/sign-in" variant="h6">
                        Sign in
                    </Link>
                </Typography>
            </form>
      );

};

export default withRouter(SignUpForm);


const Sugestion = styled(Typography)({
    marginTop: theme.spacing(2)
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

const SignUpButton = styled(Button)({
    margin: theme.spacing(2, 0)
});