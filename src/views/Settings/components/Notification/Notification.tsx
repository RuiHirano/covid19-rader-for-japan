import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
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
import { Formik, FormikValues } from "formik";
import * as Yup from "yup";
import { userActions } from "../../../../redux/saga/User/userSaga";
import { useDispatch } from "react-redux";
import { LoadingState } from "../../../../types";
import { useLoading } from "../../../../common/hooks/useLoading";
import { withRouter, match } from "react-router";
import * as H from "history";

// Container
interface ContainerProps {
    history: H.History;
    location: H.Location;
    match: match;
}
const NotificationContainer: React.FC<ContainerProps> = props => {
    const { history } = props;
    const dispatch = useDispatch();
    const handleUpdateNotification = (values: FormikValues) => {
        dispatch(
            userActions.updateNotificationAction({
                emailNotify: values.emailNotify,
                pushNotify: values.pushNotify
            })
        );
    };

    const { isLoading, isFinishLoading } = useLoading(
        LoadingState.UPDATE_NOTIFICATION
    );
    useEffect(() => {
        if (isFinishLoading) {
            history.push("/dashboard");
        }
    }, [isLoading]);

    return <Notification handleUpdateNotification={handleUpdateNotification} />;
};

export default withRouter(NotificationContainer);

// Presentational
interface Props {
    handleUpdateNotification: (values: FormikValues) => void;
}

export const Notification: React.FC<Props> = props => {
    const { handleUpdateNotification } = props;

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
                onSubmit={values => handleUpdateNotification(values)}
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

const useStyles = makeStyles(() => ({
    root: {},
    item: {
        display: "flex",
        flexDirection: "column"
    }
}));
