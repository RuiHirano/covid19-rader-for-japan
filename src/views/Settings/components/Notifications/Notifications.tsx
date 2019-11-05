import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles, Theme } from "@material-ui/core/styles";
import {
    Card,
    CardHeader,
    CardContent,
    CardActions,
    Grid,
    Divider,
    FormControlLabel,
    Checkbox,
    Typography,
    Button
} from "@material-ui/core";
import { Formik, yupToFormErrors } from "formik";
import * as Yup from "yup";

const useStyles = makeStyles(() => ({
    root: {},
    item: {
        display: "flex",
        flexDirection: "column"
    }
}));

export const Notifications: React.FC = props => {
    //const { className, ...rest } = props;

    const classes = useStyles();

    return (
        <Card
        //{...rest}
        //className={clsx(classes.root, className)}
        >
            <Formik
                initialValues={{
                    emailNotify: true,
                    pushNotify: true
                }}
                onSubmit={values => console.log("debug6 ", values)}
                validationSchema={Yup.object().shape({})}
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
                            subheader="Manage the notifications"
                            title="Notifications"
                        />
                        <Divider />
                        <CardContent>
                            <Grid container spacing={6} wrap="wrap">
                                <Grid
                                    className={classes.item}
                                    item
                                    md={4}
                                    sm={6}
                                    xs={12}
                                >
                                    <Typography gutterBottom variant="h6">
                                        Notifications
                                    </Typography>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                color="primary"
                                                checked={
                                                    values.emailNotify || false
                                                }
                                                onChange={() =>
                                                    setFieldValue(
                                                        "emailNotify",
                                                        !values.emailNotify
                                                    )
                                                }
                                            />
                                        }
                                        label="Email"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                color="primary"
                                                checked={
                                                    values.pushNotify || false
                                                }
                                                onChange={() =>
                                                    setFieldValue(
                                                        "pushNotify",
                                                        !values.pushNotify
                                                    )
                                                }
                                            />
                                        }
                                        label="Push Notifications"
                                    />
                                </Grid>
                            </Grid>
                        </CardContent>
                        <Divider />
                        <CardActions>
                            <Button
                                color="primary"
                                variant="outlined"
                                onClick={() => handleSubmit()}
                            >
                                Save
                            </Button>
                        </CardActions>
                    </div>
                )}
            </Formik>
        </Card>
    );
};

//export default Notifications;
