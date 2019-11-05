import React, { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
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
import { Formik, yupToFormErrors } from "formik";
import * as Yup from "yup";

const useStyles = makeStyles((theme: Theme) => ({
    root: {},
    textField: {
        marginTop: theme.spacing(2)
    }
}));

export const Password: React.FC = props => {
    //const { className, ...rest } = props;

    const classes = useStyles();

    const [values, setValues] = useState({
        password: "",
        confirm: ""
    });

    const handleChange = (event: any) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        });
    };

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
                onSubmit={values => console.log("debug6 ", values)}
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

Password.propTypes = {
    className: PropTypes.string
};

//export default Password;
