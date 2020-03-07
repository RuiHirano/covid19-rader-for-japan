import React from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import {
    Card,
    CardHeader,
    CardContent,
    CardActions,
    Divider,
    Button,
    TextField
} from "@material-ui/core";
import { Formik, FormikValues } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { withRouter, match } from "react-router";
import * as H from "history";
import { useChangePassword } from "../../../../redux/hooks/useUser";

// Container
interface ContainerProps {
    history: H.History;
    location: H.Location;
    match: match;
}
const PasswordContainer: React.FC<ContainerProps> = props => {
    const { history } = props;
    const dispatch = useDispatch();
    const {changePassword, status} = useChangePassword()
    const handleUpdatePassword = (values: FormikValues) => {
        changePassword()
    };

    return <Password handleUpdatePassword={handleUpdatePassword} />;
};

export default withRouter(PasswordContainer);

// Presentational
interface Props {
    handleUpdatePassword: (values: FormikValues) => void;
}

export const Password: React.FC<Props> = props => {
    const { handleUpdatePassword } = props;

    const classes = useStyles();

    return (
        <Card
        //{...rest}
        //className={clsx(classes.root, className)}
        >
            <Formik
                initialValues={{
                    password: "",
                    passwordConfirm: ""
                }}
                onSubmit={values => handleUpdatePassword(values)}
                validationSchema={Yup.object().shape({
                    password: Yup.string()
                        .min(8, "i18n.t('su_min_password')")
                        .matches(
                            /^[a-zA-Z0-9]+$/,
                            "i18n.t('su_not_match_password')"
                        )
                        .required("i18n.t('su_required_password')"),
                    passwordConfirm: Yup.string()
                        .oneOf(
                            [Yup.ref("password")],
                            "i18n.t('su_not_match_confirm_password')"
                        )
                        .required("i18n.t('su_required_password')")
                })}
            >
                {({
                    handleChange,
                    handleSubmit,
                    values,
                    errors,
                    touched,
                    handleBlur,
                    isValid,
                    isSubmitting,
                    setFieldValue
                }) => (
                    <div>
                        <CardHeader
                            subheader="Update password"
                            title="Password"
                        />
                        <Divider />
                        <CardContent>
                            <TextField
                                className={classes.textField}
                                error={
                                    errors.password && touched.password
                                        ? true
                                        : false
                                }
                                fullWidth
                                helperText={
                                    errors.password && touched.password
                                        ? errors.password
                                        : null
                                }
                                label="Password"
                                name="password"
                                onChange={handleChange("password")}
                                type="password"
                                value={values.password}
                                variant="outlined"
                                onBlur={handleBlur("password")}
                            />
                            <TextField
                                className={classes.textField}
                                error={
                                    errors.passwordConfirm &&
                                    touched.passwordConfirm
                                        ? true
                                        : false
                                }
                                fullWidth
                                helperText={
                                    errors.passwordConfirm &&
                                    touched.passwordConfirm
                                        ? errors.passwordConfirm
                                        : null
                                }
                                label="PasswordConfirm"
                                name="passwordConfirm"
                                onChange={handleChange("passwordConfirm")}
                                type="password"
                                value={values.passwordConfirm}
                                variant="outlined"
                                onBlur={handleBlur("passwordConfirm")}
                            />
                        </CardContent>
                        <Divider />
                        <CardActions>
                            <Button
                                color="primary"
                                variant="outlined"
                                onClick={() => handleSubmit()}
                            >
                                Update
                            </Button>
                        </CardActions>
                    </div>
                )}
            </Formik>
        </Card>
    );
};

const useStyles = makeStyles((theme: Theme) => ({
    root: {},
    textField: {
        marginTop: theme.spacing(2)
    }
}));

//export default Password;
