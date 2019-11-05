import React, { useState } from "react";
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

export const Email: React.FC = props => {
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
                    email: "",
                    newEmail: ""
                }}
                onSubmit={values => console.log("debug6 ", values)}
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

//export default Email;
