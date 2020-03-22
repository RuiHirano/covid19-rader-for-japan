import React, { useState } from "react";
import imgPath from "../../app/assets/app_icon.png";
import SignLayout from "../../layouts/sign";
import SignUpForm from "./templetes/signup-form";
import { Home as HomeLayout } from "../../layouts";
import { Paper, Stepper, Step, StepLabel, createStyles, Theme, Typography, TextField, Link, styled, Checkbox, Button, colors, Select, FormHelperText, MenuItem, RadioGroup, FormControlLabel, Radio, Chip } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { Controller, useForm, useFieldArray } from "react-hook-form";
import { Link as RouterLink } from "react-router-dom";
import theme from "../../styles/theme";
import * as Yup from "yup";
import TextFieldComponent from "./components/text-field";
import { useSignUp } from "../../redux/hooks/useAuth";
import { useSelector } from "react-redux";
import { ReduxState } from "../../redux/module";
import { API } from "../../redux/firebase/api";
import FormLabel from "../entry-form/components/form-label";
import moment from "moment";
import { Sex } from "../../types";

const userValidation = Yup.object().shape({
    name: Yup.string().required("必須項目です"),
    barthday: Yup.string().required("必須項目です"),
    sex: Yup.string().required("必須項目です"),
});

const contentValidation = Yup.object().shape({
});

const accountValidation = Yup.object().shape({
    email: Yup.string()
        .required("必須項目です")
        .email("アドレスが正しくありません"),
    emailConfirm: Yup.string()
        .email("アドレスが正しくありません")
        .oneOf(
            [Yup.ref("email")],
            "メールアドレスが間違っています"
        )
        .required("必須項目です"),
    password: Yup.string()
        .required("必須項目です")
        .min(8, "8文字以上にしてください")
        .max(16, "16文字以下にしてください")
        .matches(/^[a-zA-Z0-9]+$/, "半角英数字を使用してください"),
    passwordConfirm: Yup.string()
        .oneOf(
            [Yup.ref("password")],
            "パスワードが間違っています"
        )
        .required("必須項目です")
});


interface Props {
}



const SignUp: React.FC<Props> = props => {

    const steps = ['アカウントの作成', 'ユーザ情報の入力', '初期設定・登録'];
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(2);
    const handleNextStep = () => {
        setActiveStep(prevActiveStep => prevActiveStep + 1);
    };

    const handleBackStep = () => {
        setActiveStep(prevActiveStep => prevActiveStep - 1);
    };

    const [readPolicy, setReadPolisy] = useState<boolean>(false)
    const user = useSelector((state: ReduxState) => state.User)

    type AccountFormData = {
        email: string;
        emailConfirm: string;
        password: string;
        passwordConfirm: string;
    };
    type UserFormData = {
        name: string;
        message: string;
        sex: string;
        birthday: string
    };
    type ContentFormData = {
        initialInvestment: number
        currencies: string[]
        stocks: string[]
    };
    const { handleSubmit: handleAccountSubmit, errors: accountErrors, control: accountControl } = useForm<AccountFormData>({ validationSchema: accountValidation });
    const { handleSubmit: handleUserSubmit, errors: userErrors, control: userControl } = useForm<UserFormData>({ validationSchema: userValidation });
    const { handleSubmit: handleContentSubmit, errors: contentErrors, control: contentControl } = useForm<ContentFormData>({ validationSchema: contentValidation });

    const { signUp, status } = useSignUp()
    //const { handleSubmit, errors, control } = useForm<FormData>({ validationSchema: validationSchema });
    const onSubmitContent = handleContentSubmit(({ initialInvestment, currencies, stocks }) => {
        console.log("sign in", initialInvestment, currencies, stocks)
        //signUp("", email, password)
    });

    const onSubmitAccount = handleAccountSubmit(async ({ email, password }) => {
        console.log("account", email, password)
        const api = new API()
        const isExistAccount = await api.existAccount(email)
        if (isExistAccount) {
            console.log("already existed...")
        } else {
            //user.
            handleNextStep()
        }

    });
    const onSubmitUser = handleUserSubmit(({ name, message, sex, birthday }) => {
        console.log("user", name, message)
        user.Profile.Name = name
        user.Profile.Message = message
        //user.Profile.Sex = sex
        user.Profile.Birthday = birthday
        handleNextStep()
    });


    const [currency, setCurrency] = React.useState<string>("");
    const { fields: currencyFields, append: appendCurrency, remove: removeCurrency } = useFieldArray(
        {
            control: contentControl,
            name: "currencies"
        }
    )
    const [stock, setStock] = React.useState<string>("");
    const { fields: stockFields, append: appendStock, remove: removeStock } = useFieldArray(
        {
            control: contentControl,
            name: "stocks"
        }
    )

    console.log(userErrors)

    const getForm = () => {
        switch (activeStep) {
            case 0:
                return (
                    <div>
                        <Typography align="center" style={{ color: colors.grey[800] }} variant="body1">
                            無料会員登録をして今すぐ試してみましょう！
                    </Typography>

                        <Controller
                            as={
                                <TextFieldComponent
                                    title="メールアドレス"
                                    description={""}
                                    required
                                    error={accountErrors.email ? true : false}
                                    fullWidth
                                    helperText={accountErrors.email ? accountErrors.email.message : ""}
                                    label="email@example.com"
                                    name="Email"
                                    type="text"
                                    variant="outlined"
                                />
                            }
                            name="email"
                            control={accountControl}
                            defaultValue=""
                        />

                        <Controller
                            as={
                                <TextFieldComponent
                                    title="メールアドレス(確認用)"
                                    description={""}
                                    required
                                    error={accountErrors.emailConfirm ? true : false}
                                    fullWidth
                                    helperText={accountErrors.emailConfirm ? accountErrors.emailConfirm.message : ""}
                                    label="確認のためもう一度入力してください"
                                    name="Email"
                                    type="text"
                                    variant="outlined"
                                />
                            }
                            name="emailConfirm"
                            control={accountControl}
                            defaultValue=""
                        />

                        <Controller
                            as={
                                <TextFieldComponent
                                    title="パスワード(半角英数)"
                                    description={"8文字以上16文字以下"}
                                    required
                                    error={accountErrors.password ? true : false}
                                    fullWidth
                                    helperText={accountErrors.password ? accountErrors.password.message : ""}
                                    label="半角英数字でパスワードを入力"
                                    name="Password"
                                    type="password"
                                    variant="outlined"
                                />

                            }
                            name="password"
                            control={accountControl}
                            defaultValue=""
                        />

                        <Controller
                            as={
                                <TextFieldComponent
                                    title="パスワード(確認用)"
                                    description={"8文字以上16文字以下"}
                                    required
                                    error={accountErrors.passwordConfirm ? true : false}
                                    fullWidth
                                    helperText={accountErrors.passwordConfirm ? accountErrors.passwordConfirm.message : ""}
                                    label="確認のためもう一度入力してください"
                                    name="Password Confirm"
                                    type="password"
                                    variant="outlined"
                                />
                            }
                            name="passwordConfirm"
                            control={accountControl}
                            defaultValue=""
                        />

                        <PolicyConteiner>
                            <PolicyCheckbox
                                checked={readPolicy || false}
                                color="primary"
                                name="policy"
                                onChange={() => setReadPolisy(!readPolicy)}
                            />
                            <Typography color="textSecondary" variant="body1">

                                <Link
                                    color="primary"
                                    component={RouterLink}
                                    to="#"
                                    underline="always"
                                    variant="h6"
                                >
                                    利用規約
                                </Link>
                                {" "}に同意する
                            </Typography>
                        </PolicyConteiner>

                        <div style={{ textAlign: "center" }}>
                            <Button
                                color="primary"
                                style={{ width: 300 }}
                                disabled={!readPolicy}
                                size="large"
                                variant="contained"
                                onClick={() => onSubmitAccount()}
                            >
                                次へ
                    </Button>
                        </div>

                    </div>
                )
            case 1:
                return (
                    <div>
                        <Typography align="center" style={{ color: colors.grey[800] }} variant="body1">
                            無料会員登録をして今すぐ試してみましょう！
                    </Typography>
                        <Controller
                            as={
                                <TextFieldComponent
                                    title="名前"
                                    description={""}
                                    required
                                    error={userErrors.name ? true : false}
                                    fullWidth
                                    helperText={userErrors.name ? userErrors.name.message : ""}
                                    label="ex. Rui Hirano or 平野　流"
                                    name="Name"
                                    type="text"
                                    variant="outlined"
                                />
                            }
                            name="name"
                            control={userControl}
                            defaultValue=""
                        />

                        <Controller
                            as={
                                <TextFieldComponent
                                    title="ステータスメッセージ"
                                    description={""}
                                    //error={userErrors.message ? true : false}
                                    fullWidth
                                    multiline
                                    //helperText={userErrors.message ? userErrors.message.message : ""}
                                    label="自己紹介文を入力してください"
                                    variant="outlined"
                                />
                            }
                            name="message"
                            control={userControl}
                            defaultValue=""
                        />

                        <FormLabel title={"性別"} description={""}>
                            <Controller
                                as={
                                    <RadioGroup aria-label="position" name="position" value={Sex.MALE.toString()} onChange={(e) => console.log("radio: ", e.target.value)} row>
                                        <FormControlLabel
                                            value={Sex.MALE.toString()}
                                            control={<Radio color="primary" />}
                                            label="男性"
                                            labelPlacement="end"
                                        />
                                        <FormControlLabel
                                            value={Sex.FEMALE.toString()}
                                            control={<Radio color="primary" />}
                                            label="女性"
                                            labelPlacement="end"
                                        />
                                    </RadioGroup>
                                }
                                name="sex"
                                control={userControl}
                                defaultValue={Sex.MALE.toString()}
                            />
                        </FormLabel>

                        <FormLabel title={"生年月日"} description={""}>
                            <Controller
                                as={
                                    <Select
                                        style={{ width: 150, textAlign: "center" }}
                                        //error={userErrors. ? true : false}
                                        label={"年"}
                                        labelId="demo-simple-select-outlined-label"
                                        id="demo-simple-select-outlined"
                                        onChange={(e) => console.log("select: ", e)}
                                    >
                                        {Array.from(Array(120).keys(), x => moment().year() - 120 + x + 1).map((year) => {
                                            return (
                                                <MenuItem value={year}>{year}</MenuItem>
                                            )
                                        })}
                                    </Select>
                                }
                                name="birthday"
                                control={userControl}
                                defaultValue={""}
                            />
                            <Typography style={{ display: "inline" }}>年</Typography>
                            <Controller
                                as={
                                    <Select
                                        style={{ width: 150, textAlign: "center" }}
                                        label={"月"}
                                        //error={userErrors. ? true : false}
                                        labelId="demo-simple-select-outlined-label"
                                        id="demo-simple-select-outlined"
                                        onChange={(e) => console.log("select: ", e)}
                                    >
                                        {Array.from(Array(12).keys(), x => x + 1).map((month) => {
                                            return (
                                                <MenuItem value={month}>{month}</MenuItem>
                                            )
                                        })}
                                    </Select>
                                }
                                name="birthday"
                                control={userControl}
                                defaultValue={""}
                            />
                            <Typography style={{ display: "inline" }}>月</Typography>
                            <Controller
                                as={
                                    <Select
                                        style={{ width: 150, textAlign: "center" }}
                                        label={"日"}
                                        //error={userErrors. ? true : false}
                                        labelId="demo-simple-select-outlined-label"
                                        id="demo-simple-select-outlined"
                                        onChange={(e) => console.log("select: ", e)}
                                    >
                                        {Array.from(Array(moment().daysInMonth()).keys(), x => x + 1).map((day) => {
                                            return (
                                                <MenuItem value={day}>{day}</MenuItem>
                                            )
                                        })}
                                    </Select>
                                }
                                name="birthday"
                                control={userControl}
                                defaultValue={""}
                            />
                            <Typography style={{ display: "inline" }}>日</Typography>

                            <FormHelperText style={{ color: "red" }}>{userErrors.birthday ? userErrors.birthday.message : ""}</FormHelperText>
                        </FormLabel>


                        <div style={{ textAlign: "center" }}>
                            <Button
                                style={{ width: 300, margin: 10 }}
                                size="large"
                                variant="contained"
                                onClick={() => handleBackStep()}
                            >
                                戻る
                            </Button>
                            <Button
                                color="primary"
                                style={{ width: 300, margin: 10 }}
                                size="large"
                                variant="contained"
                                onClick={() => onSubmitUser()}
                            >
                                次へ
                    </Button>
                        </div>

                    </div>
                )
            case 2:
                return (
                    <div>
                        <Typography align="center" style={{ color: colors.grey[800] }} variant="body1">
                            無料会員登録をして今すぐ試してみましょう！
                    </Typography>
                        <Controller
                            as={
                                <TextFieldComponent
                                    title="初期投資金額"
                                    description={"半角数字"}
                                    //error={errors.initialInvestment ? true : false}
                                    fullWidth
                                    //helperText={errors.initialInvestment ? errors.initialInvestment.message : ""}
                                    label="初期資金を入力してください"
                                    name="initialInvestment"
                                    type="text"
                                    variant="outlined"
                                />
                            }
                            name="initialInvestment"
                            control={contentControl}
                            defaultValue={0}
                        />

                        <FormLabel title="使用通貨" description="">
                            <TextField
                                label="よく使用する通貨を入力してください(ex. USD/JPY)"
                                style={{ width: 300 }}
                                name="currency"
                                variant={"outlined"}
                                value={currency}
                                onChange={(e: any) => { setCurrency(e.target.value) }}
                            />
                            <Button
                                onClick={() => {

                                    console.log("click: ", currency)
                                    appendCurrency([currency]);
                                    setCurrency("")
                                }}
                                variant={"contained"}
                                style={{ margin: 5 }}
                            >Add Tag</Button>
                            <div style={{ width: "100%" }}>
                                {currencyFields.map((item, index) => {
                                    console.log("item: ", item)
                                    return (
                                        <Controller
                                            as={
                                                <Chip
                                                    style={{ margin: 10 }}
                                                    key={index}
                                                    label={item.value}
                                                    onDelete={() => removeCurrency(index)}
                                                />
                                            }
                                            name={`currencies[${index}]`}
                                            control={contentControl}
                                            defaultValue={item.value}
                                        />

                                    );
                                })}

                            </div>
                        </FormLabel>

                        <FormLabel title="使用銘柄" description="">
                            <TextField
                                label="よく使用する銘柄を入力してください(ex. 9434/ソフトバンク)"
                                style={{ width: 300 }}
                                name="stock"
                                variant={"outlined"}
                                value={stock}
                                onChange={(e: any) => { setStock(e.target.value) }}
                            />
                            <Button
                                onClick={() => {

                                    console.log("click: ", stock)
                                    appendStock([stock]);
                                    setStock("")
                                }}
                                variant={"contained"}
                                style={{ margin: 5 }}
                            >Add Tag</Button>
                            <div style={{ width: "100%" }}>
                                {stockFields.map((item, index) => {
                                    console.log("item: ", item)
                                    return (
                                        <Controller
                                            as={
                                                <Chip
                                                    style={{ margin: 10 }}
                                                    key={index}
                                                    label={item.value}
                                                    onDelete={() => removeStock(index)}
                                                />
                                            }
                                            name={`stocks[${index}]`}
                                            control={contentControl}
                                            defaultValue={item.value}
                                        />

                                    );
                                })}

                            </div>
                        </FormLabel>


                        <div style={{ textAlign: "center" }}>
                            <Button
                                style={{ width: 300, margin: 10 }}
                                size="large"
                                variant="contained"
                                onClick={() => handleBackStep()}
                            >
                                戻る
                            </Button>
                            <Button
                                color="primary"
                                style={{ width: 300, margin: 10 }}
                                size="large"
                                variant="contained"
                                onClick={() => onSubmitContent()}
                            >
                                登録
                        </Button>
                        </div>

                    </div>
                )
        }
    }

    return (

        <HomeLayout>
            <Paper style={{ margin: 100, padding: 30 }}>
                <Typography style={{ fontSize: 30, margin: 10 }}>{"Signup"}</Typography>
                <Stepper activeStep={activeStep} alternativeLabel>
                    {steps.map(label => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                {getForm()}

            </Paper>
        </HomeLayout>
    )

    /*return (
        <HomeLayout>
            <SignLayout imgPath={imgPath}>
                <SignUpForm />
            </SignLayout>
        </HomeLayout>
    );*/
};

export default SignUp;

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    backButton: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
}
);


const PolicyCheckbox = styled(Checkbox)({
    marginLeft: "-14px"
});

const PolicyConteiner = styled("div")({
    marginTop: theme.spacing(1),
    display: "flex",
    justifyContent: "center",
    margin: 20
});
