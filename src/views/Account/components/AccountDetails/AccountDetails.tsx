import React, { useState } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles, Theme } from "@material-ui/core/styles";
import {
    Card,
    CardHeader,
    CardContent,
    CardActions,
    Divider,
    Grid,
    Button,
    TextField
} from "@material-ui/core";
import { Formik, yupToFormErrors } from "formik";
import * as Yup from "yup";

const useStyles = makeStyles((theme: Theme) => ({
    root: {}
}));

export const AccountDetails: React.FC = props => {
    //const { className, ...rest } = props;

    return (
        <Card
        //{...rest}
        //className={clsx(classes.root, className)}
        >
            <Formik
                initialValues={{ status: "", email: "", name: "" }}
                onSubmit={values => console.log("debug6 ", values)}
                validationSchema={Yup.object().shape({
                    email: Yup.string()
                        .email("i18n.t('su_wrong_email')")
                        .required("i18n.t('su_required_email')"),
                    name: Yup.string().required("i18n.t('su_required_name')")
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
                            subheader="The information can be edited"
                            title="Profile"
                        />
                        <Divider />
                        <CardContent>
                            <Grid container spacing={3}>
                                <Grid item md={12} xs={12}>
                                    <TextField
                                        error={
                                            errors.name && touched.name
                                                ? true
                                                : false
                                        }
                                        fullWidth
                                        helperText={
                                            errors.name && touched.name
                                                ? errors.name
                                                : null
                                        }
                                        label="Name"
                                        name="Name"
                                        onChange={handleChange("name")}
                                        type="text"
                                        value={values.name}
                                        variant="outlined"
                                        onBlur={handleBlur("name")}
                                    />
                                </Grid>
                                <Grid item md={12} xs={12}>
                                    <TextField
                                        fullWidth
                                        helperText={
                                            "please specify the Status Message"
                                        }
                                        label="Status"
                                        name="Status"
                                        onChange={handleChange("status")}
                                        type="text"
                                        value={values.status}
                                        variant="outlined"
                                        onBlur={handleBlur("status")}
                                    />
                                </Grid>
                                <Grid item md={12} xs={12}>
                                    <TextField
                                        error={
                                            errors.email && touched.email
                                                ? true
                                                : false
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
                                </Grid>
                            </Grid>
                        </CardContent>
                        <Divider />
                        <CardActions>
                            <Button
                                color="primary"
                                variant="contained"
                                onClick={() => handleSubmit()}
                            >
                                Save details
                            </Button>
                        </CardActions>
                    </div>
                )}
            </Formik>
        </Card>
    );
};

//export default AccountDetails;
