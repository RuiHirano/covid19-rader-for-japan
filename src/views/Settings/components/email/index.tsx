import React, { useState, useEffect } from "react";
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
import { Formik, yupToFormErrors, FormikValues } from "formik";
import * as Yup from "yup";
import { withRouter, match } from "react-router";
import * as H from "history";
import { useDispatch } from "react-redux";
import { useChangeEmail } from "../../../../redux/hooks/useUser";

// Container
interface ContainerProps {
    history: H.History;
    location: H.Location;
    match: match;
}
const EmailContainer: React.FC<ContainerProps> = props => {
    const { history } = props;
    const dispatch = useDispatch();
    const {changeEmail, status} = useChangeEmail()
    const handleUpdateEmail = (values: FormikValues) => {
        const email = values.email
        changeEmail(email)
    };

    return <Email handleUpdateEmail={handleUpdateEmail} />;
};

export default withRouter(EmailContainer);

// Presentational
interface Props {
    handleUpdateEmail: (values: FormikValues) => void;
}

export const Email: React.FC<Props> = props => {
    const { handleUpdateEmail } = props;

    const classes = useStyles();

    return (
        <Card
        //{...rest}
        //className={clsx(classes.root, className)}
        >
            <Formik
                initialValues={{
                    email: "",
                    newEmail: ""
                }}
                onSubmit={values => handleUpdateEmail(values)}
                validationSchema={Yup.object().shape({
                    email: Yup.string()
                        .email("i18n.t('su_wrong_email')")
                        .required("i18n.t('su_required_email')"),
                    newEmail: Yup.string()
                        .email("i18n.t('su_wrong_email')")
                        .required("i18n.t('su_required_email')")
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
                        <CardHeader subheader="Update password" title="Email" />
                        <Divider />
                        <CardContent>
                            <TextField
                                className={classes.textField}
                                error={
                                    errors.email && touched.email ? true : false
                                }
                                fullWidth
                                helperText={
                                    errors.email && touched.email
                                        ? errors.email
                                        : null
                                }
                                label="Email address"
                                name="email"
                                onChange={handleChange("email")}
                                type="text"
                                value={values.email}
                                variant="outlined"
                                onBlur={handleBlur("email")}
                            />
                            <TextField
                                className={classes.textField}
                                error={
                                    errors.newEmail && touched.newEmail
                                        ? true
                                        : false
                                }
                                fullWidth
                                helperText={
                                    errors.newEmail && touched.newEmail
                                        ? errors.newEmail
                                        : null
                                }
                                label="New Email address"
                                name="New Email"
                                onChange={handleChange("newEmail")}
                                type="text"
                                value={values.newEmail}
                                variant="outlined"
                                onBlur={handleBlur("newEmail")}
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
