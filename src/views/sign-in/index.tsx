import React, { useState, useEffect } from "react";
import { Home as HomeLayout } from "../../layouts";
import { Paper, Stepper, Step, StepLabel, createStyles, Theme, Typography, TextField, Link, styled, Checkbox, Button, colors } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { Controller, useForm } from "react-hook-form";
import { Link as RouterLink } from "react-router-dom";
import theme from "../../styles/theme";
import * as Yup from "yup";
import TextFieldComponent from "./components/text-field";
import { useSignIn, usePasswordReset } from "../../redux/hooks/useAuth";
import { withRouter, match } from "react-router-dom";
import * as H from "history";
import DialogComponent, { useDialog } from "../../components/dialog";
import AlertComponent, { useAlert, AlertType } from "../../components/alert";

const validationSchema = Yup.object().shape({
    email: Yup.string()
        .email("アドレスが正しくありません")
        .required("必須項目です"),
    password: Yup.string()
        .required("必須項目です")
        .min(8, "8文字以上にしてください")
        .max(16, "16文字以下にしてください")
        .matches(/^[a-zA-Z0-9]+$/, "半角英数字を使用してください")
});


interface Props {
    history: H.History;
    location: H.Location;
    match: match;
}



const SignIn: React.FC<Props> = props => {
    const { history } = props

    const { openDialog, dialogController } = useDialog()
    const { openAlert, alertController } = useAlert()

    const { sendPasswordResetEmail, status: resetStatus } = usePasswordReset()

    const [readPolicy, setReadPolisy] = useState<boolean>(false)
    const [isForgotPassword, setIsForgotPassword] = useState<boolean>(false)
    const { signIn, status } = useSignIn()
    useEffect(() => {
        console.log("signIn status change", status.Progress)
        if (status.Progress === 100) {
            history.push("/dashboard")
        }
        if (status.Error !== "") {
            console.log("error occer: ", status.Error)
            openAlert(AlertType.ERROR, status.Error)
            //openDialog(() => { }, "a", "asdf")
        }

    }, [status])

    type FormData = {
        name: string;
        email: string;
        password: string;
        passwordConfirm: string;
    };

    const { handleSubmit, errors, control } = useForm<FormData>({ validationSchema: validationSchema });
    const onSubmit = handleSubmit(({ email, password }) => {
        console.log("sign in", email, password)
        signIn(email, password)
    });

    return (

        <HomeLayout>
            <Paper style={{ margin: 100, padding: 30 }}>
                <Typography style={{ fontSize: 30, margin: 10 }}>{"Signin"}</Typography>
                <div>
                    <Typography align="center" style={{ color: colors.grey[800] }} variant="body1">
                        サインインする
                    </Typography>

                    <Controller
                        as={
                            <TextFieldComponent
                                title="メールアドレス"
                                description={""}
                                required
                                error={errors.email ? true : false}
                                fullWidth
                                helperText={errors.email ? errors.email.message : ""}
                                label="email@example.com"
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
                            <TextFieldComponent
                                title="パスワード(半角英数)"
                                description={"8文字以上16文字以下"}
                                required
                                error={errors.password ? true : false}
                                fullWidth
                                helperText={errors.password ? errors.password.message : ""}
                                label="半角英数字でパスワードを入力"
                                name="Password"
                                type="password"
                                variant="outlined"
                            />

                        }
                        name="password"
                        control={control}
                        defaultValue=""
                    />

                    <div style={{ textAlign: "center", marginTop: 20 }}>
                        <Button
                            color="primary"
                            style={{ width: 300 }}
                            size="large"
                            variant="contained"
                            onClick={() => onSubmit()}
                        >
                            Signin
                    </Button>
                    </div>
                    <div style={{ textAlign: "center", width: "100%", marginTop: 30 }}>
                        <Link onClick={() => setIsForgotPassword(true)}>パスワードを忘れた方はこちら</Link>
                    </div>
                    {isForgotPassword ? <div style={{ marginTop: 30 }}>
                        <Typography align="center" style={{ color: colors.grey[800] }} variant="body1">
                            指定のメールアドレスにパスワードリセットメールを送信する
                        </Typography>

                        <Controller
                            as={
                                <TextFieldComponent
                                    title="メールアドレス"
                                    description={""}
                                    required
                                    error={errors.email ? true : false}
                                    fullWidth
                                    helperText={errors.email ? errors.email.message : ""}
                                    label="email@example.com"
                                    name="Email"
                                    type="text"
                                    variant="outlined"
                                />
                            }
                            name="email"
                            control={control}
                            defaultValue=""
                        />
                        <div style={{ textAlign: "center", marginTop: 20 }}>
                            <Button
                                color="secondary"
                                style={{ width: 300 }}
                                size="large"
                                variant="contained"
                                onClick={() => sendPasswordResetEmail()}
                            >
                                送信
                    </Button>
                        </div>
                    </div> :
                        <div />
                    }
                </div>

            </Paper>
            <DialogComponent controller={dialogController} />
            <AlertComponent controller={alertController} />
        </HomeLayout>
    )

};

export default withRouter(SignIn);
